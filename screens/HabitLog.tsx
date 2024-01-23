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
  const [calendarList, setCalendarList] = useState<any>();

  const setHabits = async () => {
    const red = { key: "red", color: "red" };
    const blue = { key: "blue", color: "blue" };
    const yellow = { key: "yellow", color: "yellow" };
    const green = { key: "green", color: "green" };
    await ApiCall.GetAllLoggedData(0).then((res) => {
      let dateList: any = {};
      let dots: any = [{}];
      res?.forEach((d: any) => {
        let date = d.date.split("T")[0];
        d.data.moodLog.forEach((m: any) => {
          const dot = {
            key: m.color,
            color: m.color,
          };
          if (
            !dots.some((d: any) => d.key === dot.key && d.color === dot.color)
          ) {
            dots.push(dot);
          }
        });
        dateList[date] = {
          marked: true,
          disabled: false,
          disableTouchEvent: false,
          dots: dots,
        };
        dots = [{}];
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
        markingType="multi-dot"
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
