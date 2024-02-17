import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import DissmissableArea from "../componenets/DissmissableArea";
import { ApiCall } from "../functions/ApiCall";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import { UserContext } from "../Types/UserContext";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;
export default function Login({ route, navigation }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user, setUser } = React.useContext(UserContext);

  const login = async () => {
    const user = await ApiCall.Login(email, password);
    if (user.userId >= 0) {
      setUser(user);
      console.log("Logging in ....");
      navigation.navigate("Home");
    }
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
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
          <Button mode="contained" onPress={login}>
            Login
          </Button>
        </View>
      </View>
    </DissmissableArea>
  );
}

const styles = StyleSheet.create({
  loginView: {
    alignItems: "center",
  },
  loginText: {
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
