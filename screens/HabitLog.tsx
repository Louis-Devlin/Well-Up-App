import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";

import { RootStackParamList } from "../Types/RootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiCall } from "../functions/ApiCall";
import { HabitLogResponse } from "../Types/HabitLogResponse";

type Props = NativeStackScreenProps<RootStackParamList, "HabitLog">;
export default function HabitLog({ route, navigation }: Props) {
  const openDayView = (day: any) => {
    console.log(day);
  };
  const [habitList, setHabitList] = useState<HabitLogResponse[]>([]);
  const [habitDaysList, setHabitDaysList] = useState<any>();
  useEffect(() => {
    ApiCall.getAllLoggedHabits(0).then((habits) => {
      let dateList: any = {};
      setHabitList(habits);

      habits.map((h) => {
        let date = h.date.toISOString().split("T")[0];
        dateList[date] = { marked: true };
      });
      setHabitDaysList(dateList);
    });
  }, []);

  return (
    <View>
      <CalendarList
        markedDates={habitDaysList}
        onDayPress={(day) => openDayView(day)}
      ></CalendarList>
    </View>
  );
}
