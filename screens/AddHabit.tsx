import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ApiCall } from "../functions/ApiCall";
import { Habit } from "../Types/Habit";
import Icon from "react-native-vector-icons/AntDesign";
import { UserHabitRequest } from "../Types/UserHabitRequest";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
type Props = NativeStackScreenProps<RootStackParamList, "AddHabit">;
export default function AddHabit({ route, navigation }: Props) {
  const [habits, setHabits] = useState<Habit[]>();
  console.log(route.params);
  const { userHabits } = route.params;
  useEffect(() => {
    console.log("Use Effect Hit");
    ApiCall.GetHabits().then((h) => {
      const habitIds: number[] = h?.map((habit) => habit.habitId) || [];
      console.log("habitIds:", habitIds);
      console.log("userHabits:", userHabits);
      const filteredHabits = h.filter(
        (num) => !userHabits.includes(num.habitId)
      );
      console.log(filteredHabits);
      setHabits(filteredHabits);
    });
  }, []);

  // ...

  const startTracking = async (habitId: number): Promise<boolean> => {
    try {
      const userResponse = await new Promise<boolean>((resolve) => {
        Alert.alert(
          "New Habit",
          "Would you like to start tracking this habit?",
          [
            {
              text: "No",
              onPress: () => resolve(false),
            },
            {
              text: "Yes",
              onPress: () => {
                let request: UserHabitRequest = {
                  userId: 0,
                  habitId: habitId,
                  habitName: "",
                };
                ApiCall.StartTrackingHabit(request).then((res) => {
                  console.log("Sucess");
                  resolve(true);
                });
              },
            },
          ]
        );
      });
      if (userResponse) {
        navigation.goBack();
      }
      return userResponse;
    } catch (error) {
      console.error(`Error Occured: ${error}`);
      return false;
    }
  };
  const addNew = async (): Promise<boolean> => {
    try {
      const userResponse = await new Promise<boolean>((resolve) => {
        Alert.alert(
          "New Habit",
          "Would you like to start tracking this habit?",
          [
            {
              text: "No",
              onPress: () => resolve(false),
            },
            {
              text: "Yes",
              onPress: (habitName: any) => {
                let request: UserHabitRequest = {
                  userId: 0,
                  habitId: -1,
                  habitName: habitName,
                };
                ApiCall.StartTrackingHabit(request).then((res) => {
                  console.log("Sucess");
                  resolve(true);
                });
              },
            },
          ]
        );
      });
      if (userResponse) {
        navigation.goBack();
      }
      return userResponse;
    } catch (error) {
      console.error(`Error: ${error}`);
      return false;
    }
  };
  return (
    <View>
      <Icon.Button size={20} name="question" onPress={addNew}>
        Habit not here
      </Icon.Button>
      {habits?.map((item: Habit) => (
        <View style={styles.container} key={item.habitId}>
          <Button
            title={item.habitName}
            onPress={() => {
              startTracking(item.habitId);
            }}
          />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
