import {
  useState,
  useMemo,
  useRef,
  useContext,
  useEffect,
  createContext,
} from "react";
import { useUserContext } from "./UserContext";
import { useLocalStorage } from "../hooks/useStorage";

const EventCalendarContext = createContext();

export function EventCalendarProvider({ children }) {
  const { activeUser } = useUserContext();
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("upcoming");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const [shake, setShake] = useState(true);

  const { getItemL, setItemL } = useLocalStorage();
  const allUsers = getItemL("users", []);

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  // Refs for input fields to focus on error
  const nameRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (activeUser && findUser !== -1) {
      setEvents(allUsers[findUser]?.events || []);
    }
  }, [activeUser, findUser]);

  const addEvent = (event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, event];
      updatedEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
      return updatedEvents;
    });
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, events: updatedEvents } : user
    );
    setItemL("users", updatedUsers);
    setEvents(updatedEvents);
  };

  const handleSubmit = (e, setShowForm, setShowAddEvent) => {
    e.preventDefault();
    // Validation for empty NAME field
    if (!name) {
      setError("You need to fill all fields");
      setShake(false);
      setTimeout(() => setShake(true), 10);

      // Set up a focus on the name input field
      nameRef.current.focus();
      return;
    }
    // Validation for empty START field
    if (!start) {
      setError("You need to fill all fields");
      setShake(false);
      setTimeout(() => setShake(true), 10);

      // Set up a focus on the start date input field
      startRef.current.focus();
      return;
    }
    // Validation for empty END field
    if (!end) {
      setError("You need to fill all fields");
      setShake(false);
      setTimeout(() => setShake(true), 10);

      // Set up a focus on the end date input field
      endRef.current.focus();
      return;
    }

    const newEvent = {
      id: Date.now(),
      name,
      start,
      end,
    };

    const updatedUser = {
      ...allUsers[findUser],
      events: [...(allUsers[findUser].events || []), newEvent],
    };

    const updatedUsers = [
      ...allUsers.slice(0, findUser),
      updatedUser,
      ...allUsers.slice(findUser + 1),
    ];
    setItemL("users", updatedUsers);
    addEvent(newEvent);

    setName("");
    setStart("");
    setEnd("");
    setError(null);
    //Hide form after adding event
    setShowForm(false);
    // Show the add event button after adding event
    setShowAddEvent(true);
  };

  useEffect(() => {
    const now = new Date();
    const filtered = events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      if (filter === "upcoming") {
        return eventEnd > now;
      } else if (filter === "past") {
        return eventStart < now && eventEnd < now;
      } else {
        return true;
      }
    });

    const sorted = filtered.sort((a, b) => new Date(a.end) - new Date(b.end));
    setFilteredEvents(sorted);
  }, [events, filter]);

  const handleSave = (id) => {
    if (!newName.trim() || !newStart.trim() || !newEnd.trim()) return;

    const updatedEvents = events.map((event) =>
      event.id === id
        ? { ...event, name: newName, start: newStart, end: newEnd }
        : event
    );

    setEvents(updatedEvents);

    const updatedUsers = allUsers.map((user, i) =>
      i === findUser ? { ...user, events: updatedEvents } : user
    );

    setItemL("users", updatedUsers);

    setEditingEventId(null);
    setNewName("");
    setNewStart("");
    setNewEnd("");
  };

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setNewName(event.name);
    setNewStart(event.start);
    setNewEnd(event.end);
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
        setStart,
        setName,
        error,
        setError,
        newName,
        newStart,
        newEnd,
        setNewName,
        setNewStart,
        setNewEnd,
        handleSave,
        editingEventId,
        setEditingEventId,
        handleEdit,
        shake,
        nameRef,
        startRef,
        endRef,
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
