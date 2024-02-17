import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../Types/RootStackParamList";
import { Button, RadioButton } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Suggestions">;

export default function Suggestions({ route, navigation }: Props) {
  const [option, setOption] = React.useState("positive"); // Set the default value for the radio button
  const { text } = route.params; // Access the props passed through navigation

  const handlePress = (value: string) => {
    setOption(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions</Text>
      <Text style={styles.description}>
        We are sorry the mood prediction wasn't quite right, please select
        Positive, Negative, or Neutral and then submit. This will help to
        improve our Machine Learning Model.
      </Text>
      <Text style={styles.prop}>Your Text: {text}</Text>
      <Text style={styles.prop}>Predicted Sentiment: </Text>

      <TouchableOpacity onPress={() => handlePress("positive")}>
        <View
          style={[
            styles.radioButtonContainer,
            option === "positive" && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "positive" && styles.selectedLabel,
            ]}
          >
            Positive
          </Text>
          <RadioButton
            value="positive"
            status={option === "positive" ? "checked" : "unchecked"}
            onPress={() => handlePress("positive")}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("negative")}>
        <View
          style={[
            styles.radioButtonContainer,
            option === "negative" && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "negative" && styles.selectedLabel,
            ]}
          >
            Negative
          </Text>
          <RadioButton
            value="negative"
            status={option === "negative" ? "checked" : "unchecked"}
            onPress={() => handlePress("negative")}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("neutral")}>
        <View
          style={[
            styles.radioButtonContainer,
            option === "neutral" && styles.selectedButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "neutral" && styles.selectedLabel,
            ]}
          >
            Neutral
          </Text>
          <RadioButton
            value="neutral"
            status={option === "neutral" ? "checked" : "unchecked"}
            onPress={() => handlePress("neutral")}
          />
        </View>
      </TouchableOpacity>
      <Button>
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
});
