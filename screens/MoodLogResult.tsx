import { Text, StyleSheet, View } from "react-native";
import React from "react";

export default function MoodLogResult() {
  return (
    <View>
      <Text style={styles.largeText}>Sucess!</Text>
      <Text>Your mood has been successfully logged</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  largeText: {
    fontSize: 50,
  },
});
