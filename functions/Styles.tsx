import { StyleSheet } from "react-native";

export default function getTextStyle(posX: number, posY: number) {
  if (posX >= 5 && posY >= 5) {
    return {
      backgroundColor: "green",
      color: "white",
    };
  } else if (posX >= 5 && posY < 5) {
    return {
      backgroundColor: "blue",
      color: "white",
    };
  } else if (posX < 5 && posY >= 5) {
    return {
      backgroundColor: "yellow",
    };
  } else {
    return {
      backgroundColor: "red",
      color: "white",
    };
  }
}
