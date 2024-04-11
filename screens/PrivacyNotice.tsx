import React from "react";
import { Text, View } from "react-native";

export default function PrivacyNotice() {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          alignSelf: "center",
        }}
      >
        Privacy Notice
      </Text>

      <Text>
        {"\n"}
        By consenting to this privacy notice, you give permission for you name
        and email address to be stored, for the purpose of keeping your user
        data. {"\n\n"}Your logged moods are habits are also stored, but the text
        that you enter is not stored. {"\n\n"}If you wish for all of your data
        to be erased, please get in contact via
        louis.devlin@students.plymouth.ac.uk
      </Text>
    </View>
  );
}
