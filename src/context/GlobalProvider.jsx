import { UserProvider } from "./UserContext";
import { HabitProvider } from "./HabitContext";
import { EventCalendarProvider } from "./EventCalendarContext";
import { ThemeProvider } from "./ThemeContext";

export function GlobalProvider({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <EventCalendarProvider>
          <HabitProvider>{children}</HabitProvider>
        </EventCalendarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
