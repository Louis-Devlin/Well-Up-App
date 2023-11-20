import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MoodTotals } from "../Types/MoodTotals";

export default function MoodTotal({ totals }: {totals:MoodTotals}) {
  type MoodLogResult = {
    moodName: string;
    color: string;
    date: Date;
  };

  return (
    <View style={styles.container}>
      <Text>Red: {totals.red}</Text>
      <Text>Blue: {totals.blue}</Text>
      <Text>Yellow: {totals.yellow}</Text>
      <Text>Green: {totals.green}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
