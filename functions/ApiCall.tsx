import axios from "axios";
import { ApiResponse } from "../Types/ApiResponse";
import { MoodTotals } from "../Types/MoodTotals";
export class ApiCall {
  static async LogMood(
    userId: number,
    moodId: number,
    date: Date
  ): Promise<ApiResponse> {
    const response = new ApiResponse();
    await axios
      .post(
        "http://localhost:5239/api/MoodLog",
        {
          userId: userId,
          moodId: moodId,
          date: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        response.responseData = res.data;
        response.success = true;
      })
      .catch((err) => {
        response.error = err;
      });
    return response;
  }
  static async getMoodTotals(userId: number): Promise<MoodTotals> {
    let totals = new MoodTotals();
    await axios.get(`http://localhost:5239/User/${userId}`).then((response) => {
      response.data?.forEach((mood: any) => {
        switch (mood.color) {
          case "red":
            totals.red++;
            break;
          case "blue":
            totals.blue++;
            break;
          case "yellow":
            totals.yellow++;
            break;
          case "green":
            totals.green++;
            break;
        }
      });
    });
    return totals;
  }
}
