import { Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import TYPES from "../HealthData/Types/DITypes";
import HealthData from "../HealthData/interfaces/HealthData";
import { HealthDataContext } from "../Types/HealthDataContext";

export default function StepCount() {
  const context = useContext(HealthDataContext);
  const healthData = context?.get<HealthData>(TYPES.HealthData);

  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (healthData) {
      healthData
        .init()
        .then(() => {
          console.log("Health Data Initialized");
          // Assuming getSteps is asynchronous
          healthData
            .getSteps(new Date())
            .then((steps) => {
              setSteps(steps);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [context, healthData]);

  return (
    <View>
      <Text>Step Count : {steps}</Text>
    </View>
  );
}
