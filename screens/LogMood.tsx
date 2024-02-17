import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import MoodItem from "../componenets/MoodItem";
type RootStackParamList = {
  Home: undefined;
  MoodLog: undefined;
  HabbitTrack: undefined;
  MoodLogResult: undefined;
};
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoodTotals } from "../Types/MoodTotals";
import { ApiCall } from "../functions/ApiCall";
import DissmissableArea from "../componenets/DissmissableArea";
import StepCount from "../componenets/StepCount";
import { UserContext } from "../Types/UserContext";
import { HealthDataContext } from "../Types/HealthDataContext";
import HealthData from "../HealthData/interfaces/HealthData";
import TYPES from "../HealthData/Types/DITypes";
type Props = NativeStackScreenProps<RootStackParamList, "LogMood">;
export default function LogMood({ route, navigation }: Props) {
  const [text, setText] = useState("");
  type Mood = {
    moodId: number;
    moodName: string;
    positionX: number;
    positionY: number;
    colour: string;
  };
  const { user, setUser } = useContext(UserContext);

  const [moods, setMoods] = useState<Mood[] | null>();
  const healthDataContext = useContext(HealthDataContext);
  const healthData = healthDataContext?.get<HealthData>(TYPES.HealthData);
  const [sleepHours, setSleepHours] = useState(0);
  const [filteredMoods, setFilteredMoods] = useState<Mood[] | null>();
  const [showAll, setShowAll] = useState(false);
  const [cols, setCols] = useState<Mood[][]>([]);
  const fetchMoods = async (text: string) => {
    setMoods([]);
    setFilteredMoods([]);
    try {
      const sentimentResponse = await axios.get(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/Sentiment/sentimentprediction?sentimentText=${encodeURI(
          text
        )}`
      );
      console.log("Sentiment Response", sentimentResponse.data);

      const moodsResponse = await axios.get(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/Moods?sentiment=${sentimentResponse.data}`
      );

      const baseList = [...moodsResponse.data];
      const filteredMoods = [];
      if (moodsResponse.data.length > 0) {
        if (moodsResponse.data[0].colour === "red") {
          baseList.reverse();
        }
        if (sleepHours === 0) {
          baseList.push(...baseList.slice(0, 3));
        } else if (sleepHours === 9) {
          baseList.push(...baseList.slice(7, 10));
        } else {
          if (sleepHours - 1 >= 0 && sleepHours - 1 < baseList.length) {
            filteredMoods.push(baseList[sleepHours - 1]);
          }
          if (sleepHours >= 0 && sleepHours < baseList.length) {
            filteredMoods.push(baseList[sleepHours]);
          }
          if (sleepHours + 1 >= 0 && sleepHours + 1 < baseList.length) {
            filteredMoods.push(baseList[sleepHours + 1]);
          }
        }
      }
      const columns: Mood[][] = Array.from({ length: 10 }, () => []); // Create an array of 10 empty arrays

      moodsResponse.data.forEach((mood: Mood) => {
        columns[mood.positionY].push(mood); // Push each mood into its corresponding column
      });
      setCols(columns);
      setMoods(moodsResponse.data);
      setFilteredMoods(filteredMoods);
      console.log("Filtered Moods", filteredMoods.length);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };
  useEffect(() => {
    if (healthData) {
      healthData.init().then(() => {
        healthData.getSleepData(new Date()).then((sleepData: any) => {
          console.log(`Setting Sleep Hours ${Math.round(sleepData)}`);
          setSleepHours(Math.round(sleepData));
        });
      });
    }
  }, []);
  return (
    <DissmissableArea>
      <View style={styles.container}>
        <Text style={styles.heading}>What did you do today?</Text>
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
        <ScrollView horizontal={true}>
          {cols.map((column, index) => (
            <FlatList
              key={index}
              data={column}
              ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
              contentContainerStyle={styles.listContainer} // Add this line to style the list container
              renderItem={({ item, index }) => {
                let energyText = "";
                if (index == 0) {
                  energyText = "(High Energy)";
                } else if (index == 9) {
                  energyText = "(Low Energy)";
                }

                return (
                  <MoodItem
                    id={item.moodId}
                    name={item.moodName}
                    posX={item.positionX}
                    posY={item.positionY}
                    colour={item.colour}
                    navigation={navigation}
                    index={index}
                    energyText={energyText}
                  />
                );
              }}
            />
          ))}
        </ScrollView>

        {filteredMoods?.length > 0 ? (
          <Button
            title={showAll ? "Show Filtered Moods" : "Show All Moods"}
            onPress={() => setShowAll(!showAll)}
          />
        ) : null}
        <Button
          title="Incorrect Suggestion?"
          onPress={() => {
            navigation.navigate("Suggestions",{
              text:text
            });
          }}
        />
      </View>
    </DissmissableArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 650,
  },
  input: {
    borderWidth: 1,
    padding: 10,
  },
  heading: {
    fontSize: 30,
  },
  listContainer: {},
});
