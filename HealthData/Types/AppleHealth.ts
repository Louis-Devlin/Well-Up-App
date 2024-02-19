import AppleHeathKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from "react-native-health";
import HealthData from "../interfaces/HealthData";
import { injectable } from "inversify";

const { Permissions } = AppleHeathKit.Constants;
@injectable()
export default class AppleHealth implements HealthData {
  private permissions: HealthKitPermissions = {
    permissions: {
      read: [Permissions.SleepAnalysis],
      write: [],
    },
  };
  private hasPermissions: boolean = false;
  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      AppleHeathKit.initHealthKit(this.permissions, (err) => {
        if (err) {
          console.error(`Error initializing Apple Health: ${err}`);
          reject(err);
        } else {
          this.hasPermissions = true;
          resolve();
        }
      });
    });
  }
  public getSteps(date: Date): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.hasPermissions) {
        resolve(0);
      }
      const options: HealthInputOptions = {
        date: date.toISOString(),
      };
      AppleHeathKit.getStepCount(options, (err, results) => {
        if (err) {
          console.error(`Error trying to get steps: ${err}`);
          reject(err);
        } else {
          resolve(results.value);
        }
      });
    });
  }
  public getHeartRate(date: Date): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.hasPermissions) {
        resolve(0);
      }
      const options: HealthInputOptions = {
        startDate: date.toISOString(),
      };
      AppleHeathKit.getHeartRateSamples(options, (err, results) => {
        console.log(results);
        if (err) {
          console.error(`Error trying to get heart rate: ${err}`);
          reject(err);
        } else {
          console.log(results);
          resolve(results[0]?.value);
        }
      });
    });
  }
  public getSleepData(date: Date): Promise<number> {
    console.log("I am here");
    return new Promise((resolve, reject) => {
      if (!this.hasPermissions) {
        reject(0);
      }

      const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 1,
        21,
        0,
        0
      );
      // end of the night at 9 AM the next day
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        9,
        0,
        0
      );

      const options: HealthInputOptions = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 100,
        ascending: true,
      };

      AppleHeathKit.getSleepSamples(options, (err, results: any[]) => {
        if (err) {
          console.error(`Error trying to get sleep data: ${err}`);
          return;
        }

        let totalSleep = 0;
        let latestEndTime = new Date(results[0].startDate).getTime();

        for (let sample of results) {
          const startTime = new Date(sample.startDate).getTime();
          const endTime = new Date(sample.endDate).getTime();
          if (sample.value == "INBED" || sample.value == "AWAKE") {
            continue;
          }
          if (startTime > latestEndTime) {
            totalSleep += endTime - startTime;
          } else if (endTime > latestEndTime) {
            totalSleep += endTime - latestEndTime;
          }

          if (endTime > latestEndTime) {
            latestEndTime = endTime;
          }
        }

        totalSleep = totalSleep / 1000 / 60 / 60;
        resolve(totalSleep);
      });
    });
  }
}
