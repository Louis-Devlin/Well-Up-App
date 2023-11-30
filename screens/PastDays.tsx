import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { ApiCall } from "../functions/ApiCall";
import { HabitTotals } from "../Types/HabitTotals";
import { DataTable } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "PastLogs">;

export default function PastDays({ route, navigation }: Props) {
  const [log, setLog] = useState<HabitTotals[]>([]);
  const { date } = route.params;
  useEffect(() => {
    ApiCall.getLoggedHabitsByDate(0, date).then((res) => {
      setLog(res.responseData.data);
      console.log(res.responseData.data);
    });
  }, []);
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
        </DataTable.Header>
        {log?.slice(0, log.length).map((item: HabitTotals, index: number) => (
            
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.habitName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}
