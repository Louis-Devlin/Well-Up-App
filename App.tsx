import React, { useState } from "react";
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
import Login from "./screens/Login";
import { UserContext } from "./Types/UserContext";
import Register from "./screens/Register";
import HealthDataProvider from "./componenets/HealthDataProvider";
import { Container } from "inversify";
import HealthData from "./HealthData/interfaces/HealthData";
import TYPES from "./HealthData/Types/DITypes";
import AppleHealth from "./HealthData/Types/AppleHealth";
import { Platform } from "react-native";
import { HealthDataContext } from "./Types/HealthDataContext";

export default function App() {
  const container = new Container();
if(Platform.OS === "ios"){
  container.bind<HealthData>(TYPES.HealthData).to(AppleHealth);
}
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <HealthDataContext.Provider value={container}>
        <UserContext.Provider value={{ user, setUser }}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MoodLog" component={LogMood} />
            <Stack.Screen name="HabitTrack" component={HabbitTrack} />
            <Stack.Screen name="MoodLogResult" component={MoodLogResult} />
            <Stack.Screen name="AddHabit" component={AddHabit} />
            <Stack.Screen name="HabitLog" component={HabitLog} />
            <Stack.Screen name="PastLogs" component={PastDays} />
          </Stack.Navigator>
        </UserContext.Provider>
      </HealthDataContext.Provider>
    </NavigationContainer>
  );
}
