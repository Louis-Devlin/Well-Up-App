export default function getBackgroundStyle(colour: string, index: number) {
  const cycleIndex = index % 5;
  const opacity = 1 - cycleIndex * 0.12;
  switch (colour) {
    case "green":
      return {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(38,130,30, ${opacity})`,
        color: "white",
        padding: 5,
        borderRadius: 30,
        width: 300,
      };
    case "blue":
      return {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(0, 0, 255, ${opacity})`,
        color: "white",
        padding: 5,
        borderRadius: 30,
        width: 300,
      };
    case "yellow":
      return {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(235, 204, 52, ${opacity})`,
        padding: 5,
        borderRadius: 30,
        width: 300,
      };
    case "red":
      return {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(255, 0, 0, ${opacity})`,
        color: "white",
        padding: 5,
        borderRadius: 30,
        width: 300,
      };
  }
}
