import React from "react";
import { DataTable } from "react-native-paper";
type ItemProps = {
  habitData: any;
};
export default function HabitTotalsTable({ habitData }: ItemProps) {
  console.log(habitData);
  if(habitData == undefined || habitData.length == 0) {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>No Data</DataTable.Cell>
          <DataTable.Cell>No Data</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    )
  }
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Habit</DataTable.Title>
        <DataTable.Title>Count</DataTable.Title>
      </DataTable.Header>
      {console.log(habitData)}
      
      {habitData?.map((item: any, index: number) => {
        return (
          <DataTable.Row key={item.habbitId}>
            <DataTable.Cell>{item.habitName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
}
