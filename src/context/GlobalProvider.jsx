import { HabitProvider } from "./HabitContext";
import { ThemeProvider } from "./ThemeContext";
import { ScheduleProvider } from "./ScheduleContext";
import { TodoProvider } from "./TodoContext";
import { UserProvider } from "./UserContext";

export function GlobalProvider({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <ScheduleProvider>
          <HabitProvider>
            <TodoProvider>{children}</TodoProvider>
          </HabitProvider>
        </ScheduleProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
