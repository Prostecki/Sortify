import { useState, useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useStorage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { getItemL, setItemL } = useLocalStorage();
  const [darkMode, setDarkMode] = useState(() => getItemL("darkmode") ?? false);

  const handleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      setItemL("darkmode", next);
      return next;
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "rgb(15,15,15)" : "white";
  }, [darkMode]);

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
