import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { PieChart } from "react-native-chart-kit";
import { ApiCall } from "../functions/ApiCall";
import { MoodTotals } from "../Types/MoodTotals";
import { HabitTotalsWeekly } from "../Types/HabitTotalsWeekly";
import WeeklyHabitChart from "../componenets/WeeklyHabitChart";
import Icon from "react-native-vector-icons/AntDesign";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import WeeklyMoodChart from "../componenets/WeeklyMoodChart";
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
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FFFFFF",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 0.1) => `rgba(0, 0, 200, ${opacity})`,
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
        <WeeklyMoodChart moodTotals={moodTotals} chartConfig={chartConfig} />
      </Pressable>
      <Pressable
        style={Styles.center}
        onPress={() => {
          navigation.navigate("HabitTrack");
        }}
      >
        <WeeklyHabitChart habitTotals={habitTotals} chartConfig={chartConfig} />
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
