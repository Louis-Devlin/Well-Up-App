import React, { useCallback, useEffect, useState, useContext } from "react";
import { RootStackParamList } from "../Types/RootStackParamList";
import { View, StyleSheet, Alert } from "react-native";
import { ApiCall } from "../functions/ApiCall";
import Icon from "react-native-vector-icons/AntDesign";
import { HabitTotals } from "../Types/HabitTotals";
import HabitTotalsTable from "../componenets/HabitLogTotalsTable";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../Types/UserContext";
type Props = NativeStackScreenProps<RootStackParamList, "AddHabit">;

export default function HabbitTrack({ route, navigation }: Props) {
  const { user, setUser } = useContext(UserContext);
  const [log, setLog] = useState<HabitTotals[]>([]);
  const updateTotals = () => {
    ApiCall.getLoggedHabitsByDate(
      user?.userId || -1,
      new Date().toISOString(),
      true
    ).then((response) => {
      console.log(response.responseData.data);
      setLog(response.responseData.data);
    });
  };
  const onLongPressCall = (item: HabitTotals) => {
    Alert.alert(
      "Stop Tracking Habit",
      "Are you sure you want to stop tracking this habit ?",
      [
        {
          text: "No",
          onPress: () => {},
        },
        {
          text: "Yes",
          onPress: () => {
            ApiCall.StopTrackingHabit(user?.userId || -1, item.habitId).then(
              () => {
                updateTotals();
              }
            );
          },
        },
      ]
    );
  };
  useFocusEffect(
    useCallback(() => {
      updateTotals();
    }, [])
  );
  useEffect(() => {
    updateTotals();
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
      <HabitTotalsTable
        log={log}
        setLog={setLog}
        onLongPressCall={onLongPressCall}
      />
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
