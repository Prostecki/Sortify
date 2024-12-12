import EventCalendar from "../components/planner/EventCalendar";
import { useState, useRef, useContext, useEffect, createContext } from "react";
import { useUserContext } from "./UserContext";

const EventCalendarContext = createContext();

export function EventCalendarProvider({ children }) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const savedEvents = localStorage.getItem(user.id);
      setEvents(savedEvents ? JSON.parse(savedEvents) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user && events.length > 0) {
      localStorage.setItem(user.id, JSON.stringify(events));
    }
  }, [events, user]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !start || !end) {
      alert("Fill all fields.");
      return;
    }

    if (!user) {
      alert("Please log in..");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name,
      start,
      end,
      userName: user.username,
      userId: user.id,
    };

    addEvent(newEvent);
    setName("");
    setStart("");
    setEnd("");
  };

  useEffect(() => {
    const now = new Date();
    setFilteredEvents(
      events.filter((event) => {
        const eventStart = new Date(event.start);
        if (filter === "upcoming") {
          return eventStart > now;
        } else if (filter === "past") {
          console.log(event);
          return eventStart <= now;
        }
        return true;
      })
    );
  }, [events, filter]);

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
        setFilter,
        filteredEvents,
        addEvent,
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
