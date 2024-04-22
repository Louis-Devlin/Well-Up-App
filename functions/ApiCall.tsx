import axios from "axios";
import { ApiResponse } from "../Types/ApiResponse";
import { MoodTotals } from "../Types/MoodTotals";
import { Habit } from "../Types/Habit";
import { UserHabitRequest } from "../Types/UserHabitRequest";
import { HabitLogResponse } from "../Types/HabitLogResponse";
import { HabitTotalsWeekly } from "../Types/HabitTotalsWeekly";
export class ApiCall {
  static async LogMood(
    userId: number,
    moodId: number,
    date: Date
  ): Promise<ApiResponse> {
    const response = new ApiResponse();
    console.log({
      userId: userId,
      moodId: moodId,
      date: date,
    });
    await axios
      .post(
        "https://well-up-api-kurpegc27a-nw.a.run.app/api/MoodLog",
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
    await axios
      .get(`https://well-up-api-kurpegc27a-nw.a.run.app/User/${userId}`)
      .then((response) => {
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
    date: string,
    active: boolean
  ): Promise<ApiResponse> {
    let response: ApiResponse = {
      responseData: "",
      success: false,
      error: "",
    };
    const params = {
      id: userId,
      date: date,
      active: active,
    };
    const call = await axios
      .get(`https://well-up-api-kurpegc27a-nw.a.run.app/api/UserHabit`, {
        params,
      })
      .then((res) => {
        response.responseData = res;
        response.success = true;
      });
    return response;
  }
  static async getAllLoggedHabits(userId: number): Promise<HabitLogResponse[]> {
    let habitList: HabitLogResponse[] = [];
    await axios
      .get(`https://well-up-api-kurpegc27a-nw.a.run.app/api/HabitLog/${userId}`)
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
        "https://well-up-api-kurpegc27a-nw.a.run.app/api/HabitLog",
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
    await axios
      .get("https://well-up-api-kurpegc27a-nw.a.run.app/api/Habit")
      .then((res) => {
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
      .post(
        "https://well-up-api-kurpegc27a-nw.a.run.app/api/UserHabit",
        trackHabit
      )
      .then((res) => {
        response = res.data;
        response.success = true;
      })
      .catch((err) => {
        response.error = err;
      });
    return response;
  }
  static async StopTrackingHabit(userId: number, habitId: number) {
    const params = {
      userId: userId,
      habitId: habitId,
    };
    axios
      .put(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/UserHabit?userId=${userId}&habitId=${habitId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        switch (res.status) {
          case 204:
            console.log("Works");
            break;
          case 404:
            console.log("Not found");
            break;
        }
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  }
  static async GetWeeklyMoodTotal(userId: number): Promise<MoodTotals> {
    let totals: MoodTotals = new MoodTotals();
    await axios
      .get(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/MoodLog/totals/${userId}`
      )
      .then((response) => {
        totals = response.data;
      });

    return totals;
  }
  static async GetWeeklyHabitTotals(
    userId: number
  ): Promise<HabitTotalsWeekly> {
    let totals: HabitTotalsWeekly = new HabitTotalsWeekly();
    await axios
      .get(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/HabitLog/totals/${userId}`
      )
      .then((response) => {
        totals = response.data;
      });
    return totals;
  }
  static async GetLoggedMoodsByDate(
    userId: number,
    date: string
  ): Promise<any> {
    let totals: MoodTotals = new MoodTotals();
    console.log(
      `https://well-up-api-kurpegc27a-nw.a.run.app/api/MoodLog/totals/${userId}/${encodeURIComponent(
        date
      )}`
    );
    await axios
      .get(
        `https://well-up-api-kurpegc27a-nw.a.run.app/api/MoodLog/totals/${userId}/${encodeURIComponent(
          date
        )}`
      )
      .then((response) => {
        totals = response.data;
      });
    return totals;
  }
  static async GetAllLoggedData(userId: number): Promise<any> {
    let response: any;
    await axios
      .get(`https://well-up-api-kurpegc27a-nw.a.run.app/User/${userId}`)
      .then((res) => {
        response = res.data;
      });
    return response;
  }

  static async Login(email: string, password: string): Promise<any> {
    let response: any = {
      user: {},
      statusCode: 0,
    };
    await axios
      .post("https://well-up-api-kurpegc27a-nw.a.run.app/api/User/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(`response from login: ${res.data}`);
        response.user = res.data;
        response.statusCode = res.status;
      })
      .catch((err) => {
        console.log(`error from login: ${err}`);
        response.statusCode = err.response.status;
      });
    return response;
  }
  static async Register(name: string, email: string, password: string) {
    let response: any = {
      userId: -1,
      statusCode: 0,
    };
    await axios
      .post("https://well-up-api-kurpegc27a-nw.a.run.app/api/User", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        response.statusCode = res.status;
        response.userId = res.data;
      })
      .catch((err) => {
        response.statusCode = err.response.status;
      });
    return response;
  }
  static async SuggestSentiment(requestBody: any): Promise<ApiResponse> {
    let response = new ApiResponse();
    await axios
      .post(
        "https://well-up-api-kurpegc27a-nw.a.run.app/api/Sentiment",
        requestBody
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
}
