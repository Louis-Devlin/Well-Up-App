import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { LineChart, PieChart } from "react-native-chart-kit";
import { ApiCall } from "../functions/ApiCall";
import { MoodTotals } from "../Types/MoodTotals";
import { HabitTotalsWeekly } from "../Types/HabitTotalsWeekly";
type Props = NativeStackScreenProps<RootStackParamList, "MoodLog">;
export default function Home({ route, navigation }: Props) {
  const [moodTotals, setMoodTotals] = useState<MoodTotals>();
  const [habitTotals, setHabitTotals] = useState<HabitTotalsWeekly>(
    new HabitTotalsWeekly()
  );

  const getWeeklyMoodTotals = async () => {
    await ApiCall.GetWeeklyMoodTotal(0).then((response: MoodTotals) => {
      setMoodTotals(response);
    });
  };
  const getWeeklyHabiitTotals = async () => {
    await ApiCall.GetWeeklyHabitTotals(0).then(
      (response: HabitTotalsWeekly) => {
        setHabitTotals(response);
      }
    );
  };

  useEffect(() => {
    getWeeklyMoodTotals();
    getWeeklyHabiitTotals();
  }, []);
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0.1) => `rgba(0,0, 200, ${opacity})`,
    decimalPlaces: 0,
  };
  return (
    <View>
      <Text style={Styles.heading}>Well Up</Text>
      <Pressable
        style={Styles.center}
        onPress={() => {
          navigation.navigate("MoodLog");
          console.log("NAV");
        }}
      >
        <Text>Weekly Logged Moods</Text>
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
              name: "😴,😞",
              population: moodTotals?.blue,
              color: "rgba(0, 0, 255, 0.5)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 25,
            },
            {
              name: "😴,😄",
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
      </Pressable>
      <Pressable
        style={Styles.center}
        onPress={() => {
          navigation.navigate("HabitTrack");
        }}
      >
        <Text>Habbit Tracking</Text>
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
            legend: ["Habits Completed This Week"], // optional
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
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: 30,
  },
  center: {
    alignSelf: "center",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});
