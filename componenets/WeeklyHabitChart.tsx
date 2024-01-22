import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { HabitTotalsWeekly } from "../Types/HabitTotalsWeekly";
import Icon from "react-native-vector-icons/AntDesign";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
type WeeklyHabitTotalsProps = {
  habitTotals: HabitTotalsWeekly;
  chartConfig: AbstractChartConfig;
};

export default function WeeklyHabitChart({
  habitTotals,
  chartConfig,
}: WeeklyHabitTotalsProps) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 30,
        }}
      >
        <Text>Weekly Logged Habits </Text>
        <Icon name="right" size={20} />
      </View>

      <LineChart
        data={{
          labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [
                habitTotals?.Monday,
                habitTotals?.Tuesday,
                habitTotals?.Wednesday,
                habitTotals?.Thursday,
                habitTotals?.Friday,
                habitTotals?.Saturday,
                habitTotals?.Sunday,
              ],
              strokeWidth: 2,
            },
          ],
        }}
        width={380}
        height={280}
        chartConfig={chartConfig}
        fromNumber={
          Math.max(...Object.values(habitTotals)) > 4
            ? Math.max(...Object.values(habitTotals))
            : 4
        }
      />
    </>
  );
}
