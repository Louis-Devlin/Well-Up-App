import axios from "axios";
import { ApiResponse } from "../Types/ApiResponse";
import { MoodTotals } from "../Types/MoodTotals";
import { Habit } from "../Types/Habit";
import { UserHabitRequest } from "../Types/UserHabitRequest";
import { HabitLog, HabitLogResponse } from "../Types/HabitLogResponse";
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

  static async getLoggedHabitsByDate(
    userId: number,
    date: string
  ): Promise<ApiResponse> {
    let response: ApiResponse = {
      responseData: "",
      success: false,
      error: "",
    };
    const call = await axios
      .get(`http://localhost:5239/api/UserHabit?id=${userId}&${date}`)
      .then((res) => {
        response.responseData = res;
        response.success = true;
      });
    return response;
  }
  static async getAllLoggedHabits(userId: number): Promise<HabitLogResponse[]> {
    let habitList: HabitLogResponse[] = [];
    await axios
      .get(`http://localhost:5239/api/HabitLog/${userId}`)
      .then((response) => {
        habitList = response.data.map((item: any) => ({
          ...item,
          date: new Date(item.date),
        }));
      });

    return habitList;
  }

  static async LogHabit(userId: number, habbitId: number, date: Date) {
    const response = new ApiResponse();
    axios
      .post(
        "http://localhost:5239/api/HabitLog",
        {
          userId: userId,
          habitId: habbitId,
          date: date,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
  }
  static async GetHabits(): Promise<Habit[]> {
    let habits: Habit[] = [];
    await axios.get("http://localhost:5239/api/Habit").then((res) => {
      habits = res.data;
      console.log(`Response : ${res.data}`);
    });
    return habits;
  }

  static async StartTrackingHabit(
    trackHabit: UserHabitRequest
  ): Promise<ApiResponse> {
    let response = new ApiResponse();
    await axios
      .post("http://localhost:5239/api/UserHabit", trackHabit)
      .then((res) => {
        response = res.data;
        response.success = true;
      })
      .catch((err) => {
        response.error = err;
      });
    return response;
  }
}
