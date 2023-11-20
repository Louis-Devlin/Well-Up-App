import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MoodItem from "../componenets/MoodItem";
type RootStackParamList = {
  Home: undefined;
  MoodLog: undefined;
  HabbitTrack: undefined;
  MoodLogResult: undefined;
};
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import MoodTotal from "../componenets/MoodTotal";
import { MoodTotals } from "../Types/MoodTotals";
import { ApiCall } from "../functions/ApiCall";
type Props = NativeStackScreenProps<RootStackParamList, "MoodLogResult">;
export default function LogMood({ route, navigation }: Props) {
  const [text, setText] = useState("");
  type Mood = {
    moodId: number;
    moodName: string;
    positionX: number;
    positionY: number;
    colour: string;
  };

  const [totals, setTotals] = useState<MoodTotals>(new MoodTotals());
  const [moods, setMoods] = useState<Mood[] | null>();
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
  useEffect(() => {
    ApiCall.getMoodTotals(0).then((response) => setTotals(response));
  }, []);
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
        scrollEnabled={false}
        data={moods ?? null}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        renderItem={({ item }) => {
          return (
            <MoodItem
              id={item.moodId}
              name={item.moodName}
              posX={item.positionX}
              posY={item.positionY}
              colour={item.colour}
              navigation={navigation}
              setTotals={setTotals}
            />
          );
        }}
      />
      <MoodTotal totals={totals} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 600,
  },
  input: {
    borderWidth: 1,
    padding: 10,
  },

  heading: {
    fontSize: 30,
  },
});
