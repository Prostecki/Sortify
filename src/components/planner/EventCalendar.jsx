import EventList from "./EventList";
import EventForm from "./EventForm";
<<<<<<< HEAD
<<<<<<<< HEAD:src/components/planner/EventCalendar.jsx
import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
========
=======
<<<<<<< HEAD:src/components/planner/EventCalendar.jsx
import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
=======
>>>>>>> 390bf5237a4713838879847c968565702365c5f9
import { useState, useEffect } from "react";
import { useEventCalendarContext } from "../../context/eventCalendarContext";
import { useUserContext } from "../../context/UserContext";
import { EventCalendarProvider } from "../../context/eventCalendarContext";

<<<<<<< HEAD
>>>>>>>> 390bf5237a4713838879847c968565702365c5f9:src/components/EventCalendar/EventCalendar.jsx
=======
>>>>>>> d88b17f006a5e28b3f57e0c4d2e806fcde44d65a:src/components/EventCalendar/EventCalendar.jsx
>>>>>>> 390bf5237a4713838879847c968565702365c5f9
export default function EventCalendar() {
  const { filter, setFilter } = useEventCalendarContext();
  const { user } = useUserContext();

  const [tasks, setTasks] = useState(() => {
    if (!user) return [];

    const savedTasks = localStorage.getItem(user.username);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(user.username, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  return (
    <div className="flex flex-col items-center gap-5 p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Event Calendar
      </h1>

      {/* Add event */}
      <EventForm />

      {/* Filter buttons */}
      <div className="mt-4">
        <button
          onClick={() => setFilter("upcoming")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Future events
        </button>
        <button
          onClick={() => setFilter("past")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Past events
        </button>
      </div>

      {/* Event list */}
      <EventList />
    </div>
  );
}
