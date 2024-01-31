import React from "react";
type User = {
  userId: number;
  name: string;
  email: string;
  password: string;
};
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: (user: User | null) => {},
});
