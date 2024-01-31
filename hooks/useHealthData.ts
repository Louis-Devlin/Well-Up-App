import { useEffect, useState } from "react";
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { Platform } from "react-native";
const { Permissions } = AppleHealthKit.Constants;

const permissions: HealthKitPermissions = {
  permissions: {
    read: [Permissions.Steps],
    write: [],
  },
};

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [steps, setSteps] = useState(0);
  
  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.error(`Error getting permissions : ${err}`);
        return;
      }
      setHasPermissions(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: new Date().toISOString(),
    };
    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.error(`Error trying to get steps: ${err}`);
        return;
      }
      setSteps(results.value);
    });
  }, [hasPermissions]);
  return steps;
};

export default useHealthData;
