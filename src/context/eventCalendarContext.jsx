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
  const [error, setError] = useState("");

  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const savedEvents = localStorage.getItem(user.id);
      setEvents(savedEvents ? JSON.parse(savedEvents) : []);
      const parsedEvents = savedEvents ? JSON.parse(savedEvents) : [];
      setEvents(parsedEvents.filter((event) => event && event.id));
    }
  }, [user]);

  useEffect(() => {
    if (user && events.length > 0) {
      localStorage.setItem(user.id, JSON.stringify(events));
    }
  }, [events, user]);

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, event];
      updatedEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
      return updatedEvents;
    });
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !start || !end) {
      setError("You need to fill all fields");
      return;
    }

    if (!user) {
      setError("Please, Log In...");
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
      events
        .filter((event) => event?.start)
        .filter((event) => {
          if (!event || !event.start) return false;
          const eventStart = new Date(event.start);
          return filter === "upcoming"
            ? eventStart > now
            : filter === "past"
            ? eventStart <= now
            : true;
        })
    );
  }, [events, filter]);

  const updateEvents = (id, updatedFields) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedFields } : event
      )
    );
  };

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
        updateEvents,
        setStart,
        setName,
        error,
        setError,
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
