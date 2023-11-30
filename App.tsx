import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LogMood from "./screens/LogMood";
import HabbitTrack from "./screens/HabbitTrack";
import MoodLogResult from "./screens/MoodLogResult";
import { RootStackParamList } from "./Types/RootStackParamList";
import AddHabit from "./screens/AddHabit";
import HabitLog from "./screens/HabitLog";
import PastDays from "./screens/PastDays";
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MoodLog" component={LogMood} />
        <Stack.Screen name="HabitTrack" component={HabbitTrack} />
        <Stack.Screen name="MoodLogResult" component={MoodLogResult} />
        <Stack.Screen name="AddHabit" component={AddHabit} />
        <Stack.Screen name="HabitLog" component={HabitLog} />
        <Stack.Screen name="PastLogs" component={PastDays} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
