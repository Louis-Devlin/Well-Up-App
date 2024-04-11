export type RootStackParamList = {
  Home: undefined;
  MoodLog: undefined;
  HabitTrack: undefined;
  MoodLogResult: undefined;
  AddHabit: { userHabits: number[] };
  HabitLog: { habitLog: any };
  PastLogs: { data: any };
  Login: undefined;
  Register: undefined;
  Suggestions: { text: string; sentiment: string };
  Walkthrough: undefined;
  PrivacyNotice: undefined;
};
