import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import DissmissableArea from "../componenets/DissmissableArea";
import { ApiCall } from "../functions/ApiCall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { UserContext } from "../Types/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;
export default function Login({ route, navigation }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, setUser } = React.useContext(UserContext);

  const login = async () => {
    setEmail("");
    setPassword("");
    const response = await ApiCall.Login(email, password);
    console.log(response);
    if (response.user.userId >= 0) {
      setUser(response.user);
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "There was an error logging in");
      }
      return;
    }
    Alert.alert("Error", "Invalid email or password");
  };

  return (
    <DissmissableArea>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>
        <View>
          <Button mode="contained" onPress={login}>
            Login
          </Button>
        </View>
        <Text
          style={{ padding: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          Not got an account? {""}
          <Text style={{ color: "blue" }}>Sign up here</Text>
        </Text>
      </View>
    </DissmissableArea>
  );
}

const styles = StyleSheet.create({
  loginView: {
    alignItems: "center",
  },
  loginText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});
