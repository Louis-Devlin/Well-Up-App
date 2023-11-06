import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import MoodItem from "../componenets/MoodItem";
export default function LogMood() {
  const [text, setText] = useState("");
  type Mood = {
    moodId: number;
    moodName: string;
    positionX: number;
    positionY: number;
  };
  const [moods, setMoods] = useState<Mood[] | null>();
  const [mood, setMood] = useState({ moodName: "", moodId: 0 });
  const fetchMoods = async (text: string) => {
    try {
      const sentimentResponse = await axios.get(
        `http://localhost:5239/api/Sentiment/sentimentprediction?sentimentText=${encodeURI(
          text
        )}`
      );

      const moodsResponse = await axios.get(
        `http://localhost:5239/api/Moods/${sentimentResponse.data}`
      );

      setMoods(moodsResponse.data);
      console.log("Moods data:", moodsResponse.data);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How was your day?</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button
        onPress={() => {
          fetchMoods(text);
        }}
        title="Predict Mood"
        color="#841584"
        accessibilityLabel="Predict Mood"
      />
      <Text>{"\n"}</Text>
      <FlatList
        data={moods || null}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        renderItem={({ item }) => {
          return (
            <MoodItem
              id={item.moodId}
              name={item.moodName}
              posX={item.positionX}
              posY={item.positionY}
              setMood={setMood}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
  },

  heading: {
    fontSize: 30,
  },
});
