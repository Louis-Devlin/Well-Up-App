

export default function getBackgroundStyle(posX: number, posY: number) {
  if (posX >= 5 && posY >= 5) {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green",
      color: "white",
      padding: 5,
      borderRadius: 30,
      width: 300,
    };
  } else if (posX >= 5 && posY < 5) {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "blue",
      color: "white",
      padding: 5,
      borderRadius: 30,
      width: 300,
    };
  } else if (posX < 5 && posY >= 5) {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "yellow",
      padding: 5,
      borderRadius: 30,
      width: 300,
    };
  } else {
    return {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      color: "white",
      padding: 5,
      borderRadius: 30,
      width: 300,
    };
  }
}


