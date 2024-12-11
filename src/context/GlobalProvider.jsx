import { UserProvider } from "./UserContext";
import { HabitProvider } from "./habitContext";
export function GlobalProvider({ children }) {
  return (
    <UserProvider>
      <HabitProvider>{children}</HabitProvider>
    </UserProvider>
  );
}
