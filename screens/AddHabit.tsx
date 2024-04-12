import { View, Text, Button, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ApiCall } from "../functions/ApiCall";
import { Habit } from "../Types/Habit";
import Icon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { UserHabitRequest } from "../Types/UserHabitRequest";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { UserContext } from "../Types/UserContext";
type Props = NativeStackScreenProps<RootStackParamList, "AddHabit">;
export default function AddHabit({ route, navigation }: Props) {
  const { user, setUser } = useContext(UserContext);
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
                  userId: user?.userId || -1,
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
        Alert.prompt(
          "New Habit",
          "Please enter the habit you want to start tracking?",
          [
            {
              text: "Cancel",
              onPress: () => resolve(false),
            },
            {
              text: "Submit",
              onPress: (habitName: any) => {
                let request: UserHabitRequest = {
                  userId: user?.userId || -1,
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
      <Icon.Button
        size={20}
        name="question"
        onPress={addNew}
        style={styles.habitNotHereButton}
      >
        Habit not here
      </Icon.Button>
      <Text style={styles.availableHabitsText}>Avaialble Habits</Text>
      {habits?.map((item: Habit) => (
        <View style={styles.container} key={item.habitId}>
          <EntypoIcon.Button
            name="add-to-list"
            onPress={() => {
              startTracking(item.habitId);
            }}
          >
            {item.habitName}
          </EntypoIcon.Button>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  habitNotHereButton: {
    flexDirection: "row", // Ensure the icon and text are in the same row

    margin: 10,
  },
  buttonText: {
    marginLeft: 5,
  },
  availableHabitsText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
  },
  container: {
    padding: 5,
  },
});
