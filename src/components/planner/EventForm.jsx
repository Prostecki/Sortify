import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { div } from "motion/react-client";
export default function EventForm() {
  const {
    handleSubmit,
    name,
    start,
    end,
    setName,
    setStart,
    setEnd,
    deleteEvent,
    filteredEvents,
  } = useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <input
            className="border border-slate-400 rounded-md mx-5"
            type="text"
            placeholder="Event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border border-slate-400 rounded-md mx-5"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            className="border border-slate-400 rounded-md mx-5"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
          <button type="submit">Add event</button>
        </form>
      ) : (
        <p>Please log in to add events</p>
      )}
    </div>
  );
}
