import { View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";

import { RootStackParamList } from "../Types/RootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiCall } from "../functions/ApiCall";
import { HabitLogResponse } from "../Types/HabitLogResponse";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "HabitLog">;
export default function HabitLog({ route, navigation }: Props) {
  const openDayView = (day: any) => {
    console.log(new Date(day.dateString).toISOString());
    navigation.navigate("PastLogs", {
      date: new Date(day.dateString).toISOString(),
    });
  };
  const [habitList, setHabitList] = useState<HabitLogResponse[]>([]);
  const [habitDaysList, setHabitDaysList] = useState<any>();
  const setHabits = () => {
    ApiCall.getAllLoggedHabits(0).then((habits) => {
      let dateList: any = {};
      setHabitList(habits);

      habits.forEach((h) => {
        let date = h.date.toISOString().split("T")[0];
        dateList[date] = {
          marked: true,
          disabled: false,
          disableTouchEvent: false,
        };
      });
      setHabitDaysList(dateList);
    });
  };
  useEffect(() => {
    setHabits();
  }, []);

  return (
    <View>
      <CalendarList
        pastScrollRange={3}
        futureScrollRange={3}
        disabledByDefault
        disableAllTouchEventsForDisabledDays
        markedDates={habitDaysList}
        onDayPress={(day) => openDayView(day)}
      ></CalendarList>
    </View>
  );
}
