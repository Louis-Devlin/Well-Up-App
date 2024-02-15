import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import TYPES from "../HealthData/Types/DITypes";
import HealthData from "../HealthData/interfaces/HealthData";
import { HealthDataContext } from "../Types/HealthDataContext";

export default function StepCount() {
  const context = useContext(HealthDataContext);
  const healthData = context?.get<HealthData>(TYPES.HealthData);

  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);

  useEffect(() => {
    if (healthData) {
      healthData
        .init()
        .then(() => {
          console.log("Health Data Initialized");
          healthData
            .getSteps(new Date())
            .then((steps) => {
              console.log("Steps: ", steps);
              setSteps(steps);
            })
            .catch((err) => {
              console.error(err);
            });
          healthData
            .getHeartRate(new Date(new Date().getDate() - 1))
            .then((heartRate) => {
              console.log("Heart Rate: ", heartRate);
              setHeartRate(heartRate);
            })
            .catch((err) => {
              console.error(err);
            });
          healthData.getSleepData(new Date()).then((sleepData) => {
            console.log("Got a response");
            console.log("Sleep Data: ", sleepData);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <View>
      <Text>Step Count : {steps}</Text>
      <Text>Heart Rate : {heartRate}</Text>
    </View>
  );
}
