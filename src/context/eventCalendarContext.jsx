import { useState, useRef, useContext, createContext } from "react";
import EventCalendar from "../components/planner/EventCalendar";

const EventCalendarContext = createContext();

export function EventCalendarProvider({ children }) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !start || !end) {
      alert("Fill all fields.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name,
      start,
      end,
    };

    addEvent(newEvent);
    setName("");
    setStart("");
    setEnd("");
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "upcoming") {
      return new Date(event.start) > new Date();
    } else {
      return new Date(event.start) <= new Date();
    }
  });

  return (
    <EventCalendarContext.Provider
      value={{
        handleSubmit,
        name,
        start,
        end,
        setEnd,
        deleteEvent,
        events,
        filter,
        addEvent,
        filteredEvents,
        setFilter,
        setStart,
        setName,
      }}
    >
      {children}
    </EventCalendarContext.Provider>
  );
}

export function useEventCalendarContext() {
  const context = useContext(EventCalendarContext);
  if (!context) {
    throw new Error("Schedule context error");
  }
  return context;
}
