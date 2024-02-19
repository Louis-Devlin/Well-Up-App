import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../Types/RootStackParamList";
import { Button, RadioButton } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Suggestions">;

export default function Suggestions({ route, navigation }: Props) {
  const [option, setOption] = React.useState("positive"); // Set the default value for the radio button
  const { text } = route.params;
  const { sentiment } = route.params;

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
      <Text style={styles.prop}>Predicted Sentiment: {sentiment} </Text>

      <TouchableOpacity
        onPress={() => handlePress("positive")}
        disabled={sentiment === "positive"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "positive" && styles.selectedButton,
            sentiment === "positive" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "positive" && styles.selectedLabel,
              sentiment === "positive" && styles.disabledLabel,
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

      <TouchableOpacity
        onPress={() => handlePress("negative")}
        disabled={sentiment === "negative"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "negative" && styles.selectedButton,
            sentiment === "negative" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "negative" && styles.selectedLabel,
              sentiment === "negative" && styles.disabledLabel,
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

      <TouchableOpacity
        onPress={() => handlePress("neutral")}
        disabled={sentiment === "neutral"}
      >
        <View
          style={[
            styles.radioButtonContainer,
            option === "neutral" && styles.selectedButton,
            sentiment === "neutral" && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              option === "neutral" && styles.selectedLabel,
              sentiment === "neutral" && styles.disabledLabel,
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledLabel: {
    color: "#888",
  },
});
