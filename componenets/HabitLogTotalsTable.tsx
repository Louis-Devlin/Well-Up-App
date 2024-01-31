import { Alert, Pressable, StyleSheet, View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import React, { useContext } from "react";
import { HabitTotals } from "../Types/HabitTotals";
import { ApiCall } from "../functions/ApiCall";
import { UserContext } from "../Types/UserContext";
type ItemProps = {
  log: HabitTotals[];
  setLog: any;
  onLongPressCall: any;
};
export default function HabitTotalsTable({
  log,
  setLog,
  onLongPressCall,
}: ItemProps) {
  const { user, setUser } = useContext(UserContext);
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Habit</DataTable.Title>
          <DataTable.Title>Count</DataTable.Title>
          <DataTable.Title>Add</DataTable.Title>
        </DataTable.Header>
        {log?.slice(0, log.length).map((item: HabitTotals, index: number) => (
          <Pressable onLongPress={() => onLongPressCall(item)}>
            <DataTable.Row style={styles.row} key={item.habitId}>
              <DataTable.Cell>
                <Text style={styles.text}>{item.habitName}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: "flex-end" }}>
                <Text style={styles.text}>{item.count}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                style={{ justifyContent: "flex-end" }}
                onPress={async () => {
                  await ApiCall.LogHabit(
                    user?.userId || -1,
                    item.habitId,
                    new Date()
                  ).then(() => {
                    let current = [...log];
                    current[index].count++;
                    setLog(current);
                  });
                }}
              >
                <Text style={styles.text}>+</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </Pressable>
        ))}
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 23,
  },
  row: {
    height: 90,
  },
});
