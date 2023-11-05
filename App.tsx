import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LogMood from "./screens/LogMood";

export default function App() {
  type RootStackParamList = {
    Home: undefined,
    MoodLog: undefined,
  }
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MoodLog" component={LogMood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
