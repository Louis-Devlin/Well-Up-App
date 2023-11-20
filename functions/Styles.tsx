export default function getBackgroundStyle(colour: string) {
  console.log(colour);
  switch (colour) {
    case "green":
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
    case "blue":
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
    case "yellow":
      return {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
        padding: 5,
        borderRadius: 30,
        width: 300,
      };
    case "red":
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
