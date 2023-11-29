import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ApiCall } from "../functions/ApiCall";
import { Habit } from "../Types/Habit";
import Icon from "react-native-vector-icons/AntDesign";
import { UserHabitRequest } from "../Types/UserHabitRequest";

export default function AddHabit() {
  const [habits, setHabits] = useState<Habit[]>();
  useEffect(() => {
    console.log("Use Effect Hit");
    ApiCall.GetHabits().then((h) => setHabits(h));
    console.log(habits);
  }, []);
  return (
    <View>
      <Icon.Button size={20} name="question">
        Habit not here
      </Icon.Button>
      {habits?.map((item: Habit) => (
        <View style={styles.container}>
          <Button title={item.habitName} onPress={() => addNew(item.habitId)} />
        </View>
      ))}
    </View>
  );
}
const addNew = (habitId: number) => {
  Alert.alert("New Habit", "Would you like to start tracking this habit?", [
    {
      text: "Yes",
      onPress: () => {
        let request: UserHabitRequest = {
          userId: 0,
          habitId: habitId,
          habitName: "",
        };
        ApiCall.StartTrackingHabit(request).then((res) => {
          console.log(
            "Success!  some sort of message displayed to confirm to user this has worked, or just go back to previous page, and you will see the habit with a count of 0"
          );
        });
      },
    },
    { text: "No", onPress: () => console.log("No") },
  ]);
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
