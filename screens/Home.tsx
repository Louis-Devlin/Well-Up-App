import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type RootStackParamList = {
  Home: undefined;
  MoodLog: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, "MoodLog">;
export default function Home({ route, navigation }: Props) {
  return (
    <View>
      <Text style={Styles.heading}>Well Up</Text>
      <Pressable
        style={Styles.center}
        onPress={() => {
          navigation.navigate("MoodLog");
          console.log("NAV");
        }}
      >
        <Text>Mood Stats</Text>
        <Image source={require("../assets/graph.png")} style={Styles.image} />
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: 30,
  },
  center: {
    alignSelf: "center",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});
