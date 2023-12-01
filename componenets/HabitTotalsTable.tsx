import { View } from "react-native";
import { DataTable } from "react-native-paper";
import React from "react";
import { HabitTotals } from "../Types/HabitTotals";
import { ApiCall } from "../functions/ApiCall";
type ItemProps = {
  log: HabitTotals[];
  setLog: any;
};
export default function HabitTotalsTable({ log, setLog }: ItemProps) {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
          <DataTable.Title>Add</DataTable.Title>
        </DataTable.Header>
        {log?.slice(0, log.length).map((item: any, index: number) => (
          <DataTable.Row key={item.habitId}>
            <DataTable.Cell>{item.habitName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
            <DataTable.Cell
              onPress={async () => {
                await ApiCall.LogHabit(0, item.habitId, new Date()).then(() => {
                  let current = [...log];
                  current[index].count++;
                  setLog(current);
                });
              }}
            >
              +
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
}
