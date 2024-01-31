import useHealthData from "../hooks/useHealthData";
import { Text, View } from "react-native";
import React from "react";

export default function StepCount() {
  const steps = useHealthData(new Date());

  return (
    <View>
      <Text>Step Count : {steps}</Text>
    </View>
  );
}
