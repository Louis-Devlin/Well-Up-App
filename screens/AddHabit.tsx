import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ApiCall } from "../functions/ApiCall";
import { Habit } from "../Types/Habit";
import { Button } from "react-native-paper";
export default function AddHabit() {
  const [habits, setHabits] = useState<Habit[]>();
  useEffect(() => {
    console.log("Use Effect Hit");
    ApiCall.GetHabits().then((h) => setHabits(h));
    console.log(habits);
  }, []);
  return (
    <View>
      {habits?.map((item: Habit) => (
        <Button>{item.habitName}</Button>
      ))}
    </View>
  );
}
