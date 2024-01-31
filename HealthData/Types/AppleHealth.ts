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
    permissions: { read: [Permissions.Steps], write: [] },
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
  }
