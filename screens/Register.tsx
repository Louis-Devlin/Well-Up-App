import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import DissmissableArea from "../componenets/DissmissableArea";
import { Button } from "react-native-paper";
import { ApiCall } from "../functions/ApiCall";
import { UserContext } from "../Types/UserContext";
type Props = NativeStackScreenProps<RootStackParamList, "Register">;
export default function Register({ route, navigation }: Props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { user, setUser } = useContext(UserContext);
  const register = async () => {
    if (password === confirmPassword) {
      const user = await ApiCall.Register(name, email, password);
      if (user >= 0) {
        const user = await ApiCall.Login(email, password);
        if (user.userId >= 0) {
          setUser(user);
          navigation.navigate("Home");
        }
      }
    } else {
      Alert.alert("Passwords do not match");
    }
  };
  return (
    <DissmissableArea>
      <View style={styles.loginView}>
        <Text style={styles.loginText}>Register</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
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
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </View>

        <Button mode="contained" onPress={register}>
          Register
        </Button>
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
