import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { ApiCall } from "../functions/ApiCall";
import { HabitTotals } from "../Types/HabitTotals";
import { DataTable } from "react-native-paper";
import { MoodTotals } from "../Types/MoodTotals";

type Props = NativeStackScreenProps<RootStackParamList, "PastLogs">;

export default function PastDays({ route, navigation }: Props) {
  const [habitLog, setHabitLog] = useState<HabitTotals[]>([]);
  const [moodLog, setMoodLog] = useState<any>();
  const { date } = route.params;
  useEffect(() => {
    ApiCall.getLoggedHabitsByDate(0, date, false).then((res) => {
      setHabitLog(
        res.responseData.data.filter((x: HabitTotals) => x.count > 0)
      );
      console.log(res.responseData.data);
      ApiCall.GetLoggedMoodsByDate(0, date).then((res) => {
        setMoodLog(res);
      });
    });
  }, []);
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
        </DataTable.Header>
        {habitLog
          ?.slice(0, habitLog.length)
          .map((item: HabitTotals, index: number) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.habitName}</DataTable.Cell>
              <DataTable.Cell>{item.count}</DataTable.Cell>
            </DataTable.Row>
          ))}
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Mood</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
          <DataTable.Title>Colour</DataTable.Title>
        </DataTable.Header>
        {moodLog?.map((item: any, index: number) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.moodName}</DataTable.Cell>
              <DataTable.Cell>{item.count}</DataTable.Cell>
              <DataTable.Cell style={{ backgroundColor: item.colour, opacity: 0.6  }}>
                {<></>}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}
