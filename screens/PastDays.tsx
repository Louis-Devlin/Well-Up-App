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
  const { data } = route.params;
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
        </DataTable.Header>
        {data.data.habitLog.map((item: any, index: number) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.habitName}</DataTable.Cell>
              <DataTable.Cell>{item.count}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Mood</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
          <DataTable.Title>Colour</DataTable.Title>
        </DataTable.Header>
        {data.data.moodLog.map((item: any, index: number) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{item.moodName}</DataTable.Cell>
              <DataTable.Cell>{item.count}</DataTable.Cell>
              <DataTable.Cell>{item.colour}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}
