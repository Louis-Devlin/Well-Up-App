import { View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";

import { RootStackParamList } from "../Types/RootStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ApiCall } from "../functions/ApiCall";
import { HabitLogResponse } from "../Types/HabitLogResponse";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../Types/UserContext";

type Props = NativeStackScreenProps<RootStackParamList, "HabitLog">;
export default function HabitLog({ route, navigation }: Props) {
  const { user, setUser } = useContext(UserContext);
  const [habitDaysList, setHabitDaysList] = useState<any>();
  const [data, setData] = useState<any>();
  const openDayView = (day: any) => {
    console.log(new Date(day.dateString).toISOString());
    navigation.navigate("PastLogs", {
      data: data.filter((d: any) => d.date.split("T")[0] === day.dateString)[0],
    });
  };

  const setHabits = async () => {
    await ApiCall.GetAllLoggedData(user?.userId || -1).then((res) => {
      setData(res);
      let dateList: any = {};
      let dots: any = [{}];
      res?.forEach((d: any) => {
        let date = d.date.split("T")[0];
        d.data.moodLog.forEach((m: any) => {
          const dot = {
            key: m.colour,
            color: m.colour,
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
