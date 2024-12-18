import EventList from "./EventList";
import EventForm from "./EventForm";
import FilterButtons from "./FilterButtons";

import "./EventCalendar.css";

export default function EventCalendar() {
  return (
    <section className="event-calendar">
      <div className="event-form-container">
        <h1 className="event-headline">Event Calendar</h1>
        <EventForm />
      </div>
      <div className="event-content-container">
        <FilterButtons />
        <EventList />
      </div>
    </section>
  );
}
