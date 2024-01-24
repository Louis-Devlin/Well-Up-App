import { View, Pressable, Text, Alert, StyleSheet } from "react-native";
import React, { useContext } from "react";
import getBackgroundStyle from "../functions/Styles";
import { ApiCall } from "../functions/ApiCall";
import { ApiResponse } from "../Types/ApiResponse";
import { UserContext } from "../Types/UserContext";
type ItemProps = {
  id: number;
  name: string;
  posX: number;
  posY: number;
  navigation: any;
  colour: string;
  setTotals: any;
  index: number;
  energyText: string;
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
export default function MoodItem({
  id,
  name,
  posX,
  posY,
  navigation,
  colour,
  setTotals,
  index,
  energyText,
}: ItemProps) {
  const { user, setUser } = useContext(UserContext);
  return (
    <View>
      <Pressable
        onPress={() => {
          Alert.alert("Todays Mood", `You have selected ${name}`, [
            {
              text: "Submit",
              onPress: async () => {
                let result: ApiResponse = await ApiCall.LogMood(
                  user?.userId ?? -1,
                  id,
                  new Date()
                );
                if (result.success) {
                  setTotals((prevTotals: any) => {
                    return {
                      ...prevTotals,
                      [colour]: (prevTotals[colour] += 1),
                    };
                  });
                  navigation.navigate("MoodLogResult");
                }
                // Error Here
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
        style={getBackgroundStyle(colour, index) as any}
      >
        <Text style={getTextStyle(posX, posY) as any}>{name}</Text>
        <Text style={styles.center}>{energyText}</Text>
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
