export type HabitLogResponse = {
  date: Date; // Assuming 'date' is a string in ISO format
  habit: null | string; // Assuming 'habit' can be either null or a string
  habitId: number;
  habitLogId: number;
  user: null | string; // Assuming 'user' can be either null or a string
  userId: number;
};
