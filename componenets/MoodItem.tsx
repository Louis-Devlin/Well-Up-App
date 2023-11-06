import { View, Pressable, Text, Alert, StyleSheet } from "react-native";
import React from "react";
import getBackgroundStyle from "../functions/Styles";
import axios from "axios";

type ItemProps = {
  id: number;
  name: string;
  posX: number;
  posY: number;
  setMood: any;
};
const getTextStyle = (posX: number, posY: number) => {
  if (posX < 5 && posY >= 5) {
    return {};
  } else {
    return {
      color: "white",
    };
  }
};
export default function MoodItem({ id, name, posX, posY, setMood }: ItemProps) {
  return (
    <View>
      <Pressable
        onPress={() => {
          setMood({
            moodName: name,
            moodId: id,
          });
          console.log(id);
          Alert.alert("Todays Mood", `You have selected ${name}`, [
            {
              text: "Submit",
              onPress: async () => {
                console.log("Submit");
                await axios
                  .post(
                    "http://localhost:5239/api/MoodLog",
                    {
                      userId: 0,
                      moodId: id,
                      date: new Date(),
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                      },
                    }
                  )
                  .then((response) => {
                    console.log(response.data);
                    console.log("Sent");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            },
            {
              text: "Select another mood",
              onPress: () => {
                console.log("ANOTHER");
              },
            },
          ]);
        }}
        style={getBackgroundStyle(posX, posY) as any}
      >
        <Text style={getTextStyle(posX, posY) as any}>{name}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});
