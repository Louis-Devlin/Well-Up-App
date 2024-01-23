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
