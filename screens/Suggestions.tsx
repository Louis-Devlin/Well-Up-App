import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RootStackParamList } from "../Types/RootStackParamList";
import { Button, RadioButton } from "react-native-paper";
import { ApiCall } from "../functions/ApiCall";

type Props = NativeStackScreenProps<RootStackParamList, "Suggestions">;

export default function Suggestions({ route, navigation }: Props) {
  const [option, setOption] = React.useState("positive");
  const { text } = route.params;
  const { sentiment } = route.params;

  const handlePress = (value: string) => {
    setOption(value);
  };

  const handleSubmit = async () => {
    let requestBody = {
      Sentiment: option,
      Text: text,
    };
    const response = await ApiCall.SuggestSentiment(requestBody);
    if (!response.success) {
      console.log("Error submitting sentiment suggestion");
      Alert.alert(
        "Error",
        "Error submitting sentiment suggestion, please try again later"
      );
      return;
    }
    Alert.alert("Success", "Sentiment suggestion submitted successfully", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Home"),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions</Text>
      <Text style={styles.description}>
        We are sorry the mood prediction wasn't quite right. {"\n\n"}Please
        select Positive, Negative, or Neutral and submit. This will help to
        improve our prediction model.
      </Text>
      <Text style={styles.prop}>Your Text: {text}</Text>
      <Text style={styles.prop}>Current Prediction: {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} </Text>

      <TouchableOpacity
        onPress={() => handlePress("Positive")}
        disabled={sentiment === "positive"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "Positive" && styles.selectedButton,
            sentiment === "positive" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "Positive" && styles.selectedLabel,
              sentiment === "positive" && styles.disabledLabel,
            ]}
          >
            Positive
          </Text>
          <RadioButton
            value="Positive"
            status={option === "Positive" ? "checked" : "unchecked"}
            onPress={() => handlePress("Positive")}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress("Negative")}
        disabled={sentiment === "negative"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "Negative" && styles.selectedButton,
            sentiment === "negative" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "Negative" && styles.selectedLabel,
              sentiment === "negative" && styles.disabledLabel,
            ]}
          >
            Negative
          </Text>
          <RadioButton
            value="Negative"
            status={option === "Negative" ? "checked" : "unchecked"}
            onPress={() => handlePress("Negative")}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress("Neutral")}
        disabled={sentiment === "neutral"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "Neutral" && styles.selectedButton,
            sentiment === "neutral" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "Neutral" && styles.selectedLabel,
              sentiment === "neutral" && styles.disabledLabel,
            ]}
          >
            Neutral
          </Text>
          <RadioButton
            value="Neutral"
            status={option === "Neutral" ? "checked" : "unchecked"}
            onPress={() => handlePress("Neutral")}
          />
        </View>
      </TouchableOpacity>
      <Button mode="contained" onPress={() => handleSubmit()}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  prop: {
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
  },
  radioButtonLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  selectedButton: {},
  selectedLabel: {},
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledLabel: {
    color: "#888",
  },
});
