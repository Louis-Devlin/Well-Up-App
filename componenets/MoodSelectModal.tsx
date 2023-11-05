import React from "react";
import { Modal, View, Text, Button } from "react-native";
type ModalProps = {
  setVisible: any;
  visible: boolean;
  name: string;
  id: number;
};
export default function MoodSelectModal({
  setVisible,
  visible,
  name,
  id,
}: ModalProps) {
  return (
    <View>
      <Modal>
        <View>
          <Text>You have selected {name}</Text>
          <Button title="Submit" />
          <Button
            title="Select Another Mood"
            onPress={() => {
              setVisible(!visible);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
