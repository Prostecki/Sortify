import { useState, useRef, useContext, createContext } from "react";
import { useLocalStorage, useSessionStorage } from "../hooks/useStorage";

const UserContext = createContext();
export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    {
      username: "user1",
      password: "password1",
      todos: [
        {
          title: "Springa",
          description: "Springa 5km",
          completed: false,
          estTime: 60,
          category: "Sport",
          deadline: "2024-12-12",
        },
      ],
      habits: [
        {
          title: "Läsa en bok",
          amount: 0,
          priority: "low/medium/high",
        },
      ],
      schedules: [
        {
          title: "möte",
          start: "17:00",
          finish: "18:00",
        },
      ],
    },
  ]);

  return <UserContext.Provider>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context;
}
