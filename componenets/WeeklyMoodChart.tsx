import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { MoodTotals } from "../Types/MoodTotals";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import Icon from "react-native-vector-icons/AntDesign";

type WeeklyMoodChartPropps = {
  moodTotals: MoodTotals;
  chartConfig: AbstractChartConfig;
};

export default function WeeklyMoodChart({
  moodTotals,
  chartConfig,
}: WeeklyMoodChartPropps) {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Weekly Logged Moods</Text>
        <Icon name="right" size={20} />
      </View>
      <PieChart
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        chartConfig={chartConfig}
        data={[
          {
            name: "😠",
            population: moodTotals?.red,
            color: "rgba(255, 0, 0, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 25,
          },
          {
            name: "😞 😴",
            population: moodTotals?.blue,
            color: "rgba(0, 0, 255, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 25,
          },
          {
            name: "😄 😴",
            population: moodTotals?.green,
            color: "rgba(0, 255, 0, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 25,
          },
          {
            name: "😁",
            population: moodTotals?.yellow,
            color: "rgba(255, 255, 0, 0.5)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 25,
          },
        ]}
        width={380}
        height={280}
      ></PieChart>
    </>
  );
}
