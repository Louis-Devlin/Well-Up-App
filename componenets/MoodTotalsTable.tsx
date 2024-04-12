import React from "react";
import { DataTable } from "react-native-paper";
type ItemProps = {
  moodData: any;
};

export default function MoodTotalsTable({ moodData }: ItemProps) {
  const getEmojiByColor = (color: string) => {
    switch (color) {
      case "red":
        return "😠";
      case "blue":
        return "😞 😴";
      case "green":
        return "😄 😴";
      case "yellow":
        return "😁";
      default:
        return "❓";
    }
  };
  if(moodData == undefined || moodData.length == 0) {
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
        <DataTable.Title>Mood</DataTable.Title>
        <DataTable.Title>Count</DataTable.Title>
        <DataTable.Title>Mood Group</DataTable.Title>
      </DataTable.Header>
      {moodData?.map((item: any, index: number) => {
        const emoji = getEmojiByColor(item.colour);
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.moodName}</DataTable.Cell>
            <DataTable.Cell>{item.count}</DataTable.Cell>
            <DataTable.Cell>{emoji}</DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
}
