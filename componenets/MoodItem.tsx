import { View, Pressable, Text } from "react-native";
import React from "react";
import { useState } from "react";
import getTextStyle from "../functions/Styles";
import MoodSelectModal from "./MoodSelectModal";
type ItemProps = {
  id: number;
  name: string;
  posX: number;
  posY: number;
  setMood: any;
};
export default function MoodItem({ id, name, posX, posY, setMood }: ItemProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <MoodSelectModal
        setVisible={setVisible}
        visible={visible}
        name={name}
        id={id}
      ></MoodSelectModal>
      <Pressable
        onPress={() => {
          setMood(name);
          setVisible(true);
        }}
        style={getTextStyle(posX, posY) as any}
      >
        <Text>{name}</Text>
      </Pressable>
    </View>
  );
}
