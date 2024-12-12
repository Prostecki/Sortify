import { UserProvider } from "./UserContext";
import { HabitProvider } from "./HabitContext";
import { EventCalendarProvider } from "./EventCalendarContext";
export function GlobalProvider({ children }) {
  return (
    <UserProvider>
      <EventCalendarProvider>
        <HabitProvider>{children}</HabitProvider>
      </EventCalendarProvider>
    </UserProvider>
  );
}
