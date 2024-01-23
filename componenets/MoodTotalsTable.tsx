import React from "react";
import { DataTable } from "react-native-paper";
type ItemProps = {
  moodData: any;
};

export default function MoodTotalsTable({ moodData }: ItemProps) {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Mood</DataTable.Title>
        <DataTable.Title>Count</DataTable.Title>
        <DataTable.Title>Colour</DataTable.Title>
      </DataTable.Header>
      {moodData?.map((item: any, index: number) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.moodName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
            <DataTable.Cell>{item.colour}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
}
