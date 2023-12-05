import React, { useCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../Types/RootStackParamList";
import { View, StyleSheet } from "react-native";
import { ApiCall } from "../functions/ApiCall";
import Icon from "react-native-vector-icons/AntDesign";
import { HabitTotals } from "../Types/HabitTotals";
import HabitTotalsTable from "../componenets/HabitTotalsTable";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
type Props = NativeStackScreenProps<RootStackParamList, "AddHabit">;

export default function HabbitTrack({ route, navigation }: Props) {
  const [log, setLog] = useState<HabitTotals[]>([]);

  useFocusEffect(
    useCallback(() => {
      ApiCall.getLoggedHabitsByDate(0, new Date().toISOString()).then(
        (response) => {
          console.log(response.responseData.data);
          setLog(response.responseData.data);
        }
      );
    }, [])
  );
  useEffect(() => {
    ApiCall.getLoggedHabitsByDate(0, new Date().toISOString()).then(
      (response) => {
        console.log(response.responseData.data);
        setLog(response.responseData.data);
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Icon.Button
          name="plus"
          onPress={() => {
            let habits: number[] = [];
            console.log(log);
            log.forEach((element) => {
              console.log(`Currently element: ${element.habitId}`);
              habits.push(element.habitId);
            });
            console.log(`Habits being passed through : ${habits}`);
            navigation.navigate("AddHabit", {
              userHabits: habits,
            });
          }}
        >
          Add Habit
        </Icon.Button>
        <Icon.Button
          name="calendar"
          onPress={() => navigation.navigate("HabitLog")}
        >
          View past days
        </Icon.Button>
      </View>
      <HabitTotalsTable log={log} setLog={setLog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
