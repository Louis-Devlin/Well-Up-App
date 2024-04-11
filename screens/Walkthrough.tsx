import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types/RootStackParamList";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Image } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Walkthrough">;

export default function ({ route, navigation }: Props) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const messages = [
    "This is the home page",
    "From the highlighted button, you will go to the log mood page",
    "Here you can enter what you have done and log your mood",
    "If you press on the incorrect suggestion button, you will come here and be able to provide suggestions",
    "From the highlighted button, you will go to the habit track page",
    "Here you can track your habits",
    "If you press on the Add Habit Button, you will be taken here",
    "This is the calendar page, accessed from the View past days button",
    "If you press on a day, you will see the log for that day",
  ];
  const images = [
    require("../assets/images/Dashboard.png"),
    require("../assets/images/MoodTrackButton.png"),
    require("../assets/images/MoodLog.png"),
    require("../assets/images/MoodSuggest.png"),
    require("../assets/images/HabitTrackButton.png"),
    require("../assets/images/HabitTrack.png"),
    require("../assets/images/AddHabit.png"),
    require("../assets/images/Calendar.png"),
    require("../assets/images/DayView.png"),
  ];
  return (
    <>
      <Image
        source={images[currentSlide]}
        style={{ width: '100%', height: '70%', resizeMode: 'contain' }}
      ></Image>
      <Text style={styles.text}>{messages[currentSlide]}</Text>
      <View style={styles.buttonContainer}>
        {currentSlide > 0 && (
          <Button
            mode="contained"
            onPress={() => setCurrentSlide(currentSlide - 1)}
            style={[styles.button, styles.previousButton]}
          >
            Previous
          </Button>
        )}
        {currentSlide < messages.length - 1 && (
          <Button
            mode="contained"
            onPress={() => setCurrentSlide(currentSlide + 1)}
            style={[styles.button, styles.nextButton]}
          >
            Next
          </Button>
        )}
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Home")}
        style={styles.homeButton}
      >
        Go to Home
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 0.5, // Update the flex value to 0.5
    marginHorizontal: 10,
  },
  previousButton: {
    marginRight: 5,
  },
  nextButton: {
    marginLeft: 5,
  },
  homeButton: {
    width: '95%',
    alignSelf: 'center',
  }
});
