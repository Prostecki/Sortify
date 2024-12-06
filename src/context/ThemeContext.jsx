import { useState, useRef, useContext, createContext } from "react";
import { useLocalStorage } from "../hooks/useStorage";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { getItemL, setItemL } = useLocalStorage();

  const [darkMode, setDarkMode] = useState(() => getItemL("darkmode") ?? false);

  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.style.backgroundColor = newMode ? "rgb(10,10,10)" : "white";
      document.body.style.color = newMode ? "rgba(170,170,170)" : "black";
      return newMode;
    });
  };
  return (
    <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme context error");
  }
  return context;
}
