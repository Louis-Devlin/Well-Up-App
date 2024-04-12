import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { ApiCall } from "../functions/ApiCall";
import { MoodTotals } from "../Types/MoodTotals";
import { HabitTotalsWeekly } from "../Types/HabitTotalsWeekly";
import WeeklyHabitChart from "../componenets/WeeklyHabitChart";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import WeeklyMoodChart from "../componenets/WeeklyMoodChart";
import { UserContext } from "../Types/UserContext";
import { useIsFocused } from "@react-navigation/native";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function Home({ route, navigation }: Props) {
  const { user, setUser } = useContext(UserContext);
  const [moodTotals, setMoodTotals] = useState<MoodTotals>(new MoodTotals());
  const [habitTotals, setHabitTotals] = useState<HabitTotalsWeekly>(
    new HabitTotalsWeekly()
  );
  const isFocussed = useIsFocused();

  const getWeeklyMoodTotals = async () => {
    await ApiCall.GetWeeklyMoodTotal(user?.userId || -1).then(
      (response: MoodTotals) => {
        setMoodTotals(response);
      }
    );
  };
  const getWeeklyHabiitTotals = async () => {
    await ApiCall.GetWeeklyHabitTotals(user?.userId || -1).then(
      (response: HabitTotalsWeekly) => {
        setHabitTotals(response);
      }
    );
  };

  useEffect(() => {
    if (!isFocussed) {
      return;
    }
    console.log("Use Effect Running");
    getWeeklyMoodTotals();
    getWeeklyHabiitTotals();
  }, [isFocussed]);

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
      <Text style={Styles.heading}></Text>
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
