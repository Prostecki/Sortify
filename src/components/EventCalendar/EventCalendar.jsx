import EventList from "./EventList";
import EventForm from "./EventForm";
import { useState } from "react";
import { useEventCalendarContext } from "../../context/eventCalendarContext";
export default function EventCalendar() {
  const { setFilter } = useEventCalendarContext();
  // const [events, setEvents] = useState([]);
  // const [filter, setFilter] = useState("upcoming");

  // const addEvent = (event) => {
  //   setEvents([...events, event]);
  // };

  // const deleteEvent = (id) => {
  //   setEvents(events.filter((event) => event.id !== id));
  // };

  // const filteredEvents = events.filter((event) => {
  //   if (filter === "upcoming") {
  //     return new Date(event.start) > new Date();
  //   } else {
  //     return new Date(event.start) <= new Date();
  //   }
  // });

  return (
    <div>
      <h1>Event Calender</h1>
      {/* Add event*/}
      <EventForm />

      {/* Filter buttons */}
      <div>
        <button onClick={() => setFilter("upcoming")}>Future events</button>
        <button onClick={() => setFilter("past")}>Past events</button>
      </div>

      {/* Event list */}
      <EventList />
    </div>
  );
}
