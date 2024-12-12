import { useState } from "react";
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/planner/EventForm.jsx
import { useEventCalendarContext } from "../../context/EventCalendarContext";
========
import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/eventCalendarContext";
import { div } from "motion/react-client";
>>>>>>>> 390bf5237a4713838879847c968565702365c5f9:src/components/EventCalendar/EventForm.jsx
=======
<<<<<<< HEAD:src/components/planner/EventForm.jsx
import { useEventCalendarContext } from "../../context/EventCalendarContext";
=======
import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/eventCalendarContext";
import { div } from "motion/react-client";
>>>>>>> d88b17f006a5e28b3f57e0c4d2e806fcde44d65a:src/components/EventCalendar/EventForm.jsx
>>>>>>> 390bf5237a4713838879847c968565702365c5f9
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
