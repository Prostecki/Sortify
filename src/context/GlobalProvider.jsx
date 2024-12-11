import { UserProvider } from "./UserContext";
export function GlobalProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
