import { useState, useRef, useContext, createContext } from "react";

const ScheduleContext = createContext();

export function ScheduleProvider({ children }) {
  return <ScheduleContext.Provider>{children}</ScheduleContext.Provider>;
}

export function useScheduleContext() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("Schedule context error");
  }
  return context;
}
