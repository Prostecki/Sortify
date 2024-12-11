import { useState, useRef, useContext, createContext } from "react";
import EventCalendar from "../components/EventCalendar/EventCalendar";

const EventCalendarContext = createContext();

export function ScheduleProvider({ children }) {
  return <EventCalendar.Provider>{children}</EventCalendar.Provider>;
}

export function useScheduleContext() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("Schedule context error");
  }
  return context;
}
