import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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

import { Container } from "inversify";
import HealthData from "./HealthData/interfaces/HealthData";
import TYPES from "./HealthData/Types/DITypes";
import AppleHealth from "./HealthData/Types/AppleHealth";
import { Platform } from "react-native";
import { HealthDataContext } from "./Types/HealthDataContext";
import Suggestions from "./screens/Suggestions";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Walkthrough from "./screens/Walkthrough";
import PrivacyNotice from "./screens/PrivacyNotice";
export default function App() {
  const container = new Container();
  if (Platform.OS === "ios") {
    container.bind<HealthData>(TYPES.HealthData).to(AppleHealth);
  }
  const [user, setUser] = useState(null);
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [loading, setLoading] = useState(true);
  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadUser();
  }, []);
  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <HealthDataContext.Provider value={container}>
        <UserContext.Provider value={{ user, setUser }}>
          <Stack.Navigator
            initialRouteName={user ? "Home" : "Login"}
            screenOptions={{
              gestureEnabled: false,
              headerLeft: () => {
                const navigation = useNavigation();
                const route = useRoute();
                if (route.name === "LogMood" || route.name === "HabitTrack") {
                  return (
                    <Button
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      Home
                    </Button>
                  );
                } else if (route.name !== "Home" && route.name !== "Login") {
                  return (
                    <Button onPress={() => navigation.goBack()}>Back</Button>
                  );
                  
                }
                if (route.name === "Home") {
                  return (
                    <Button
                      onPress={() => navigation.navigate("Walkthrough")}
                    >
                      Help
                    </Button>
                  );
                }
                 else {
                  return <View></View>;
                }
              },
              headerRight: () => {
                const navigation = useNavigation();
                if (user) {
                  return (
                    <Button
                      onPress={async () => {
                        try {
                          await AsyncStorage.removeItem("user");
                          setUser(null);
                          navigation.navigate("Login");
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      Log Out
                    </Button>
                  );
                }
                return null;
              },
              headerTitle: () => <Text>Well Up</Text>,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MoodLog" component={LogMood} />
            <Stack.Screen name="HabitTrack" component={HabbitTrack} />
            <Stack.Screen name="MoodLogResult" component={MoodLogResult} />
            <Stack.Screen name="AddHabit" component={AddHabit} />
            <Stack.Screen name="HabitLog" component={HabitLog} />
            <Stack.Screen name="PastLogs" component={PastDays} />
            <Stack.Screen name="Suggestions" component={Suggestions} />
            <Stack.Screen name="Walkthrough" component={Walkthrough} />
            <Stack.Screen name="PrivacyNotice" component={PrivacyNotice} />
          </Stack.Navigator>
        </UserContext.Provider>
      </HealthDataContext.Provider>
    </NavigationContainer>
  );
}
