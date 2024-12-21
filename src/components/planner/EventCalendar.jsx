import EventList from "./EventList";
import EventForm from "./EventForm";
import FilterButtons from "./FilterButtons";
import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { MdOutlineEventAvailable } from "react-icons/md";
import "./EventCalendar.css";
import "../../App.css";

export default function EventCalendar() {
  const { error, setError } = useEventCalendarContext();
  const [showForm, setShowForm] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(true);

  const handleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setError(null);
    setShowAddEvent((prevShowAddEvent) => !prevShowAddEvent);
  };

  return (
    <section className="event-calendar">
      <div className="flex flex-col items-center">
        <div className="event-headline-box">
          <div className="flex items-end">
            <h1 className="event-headline">Event Calendar</h1>
            <MdOutlineEventAvailable size={45} />
          </div>
        </div>
        {showAddEvent ? (
          <button onClick={handleForm} className="addtaskbtn">
            Add Event
          </button>
        ) : (
          ""
        )}
        {showForm ? (
          <EventForm
            handleForm={handleForm}
            setShowForm={setShowForm}
            setShowAddEvent={setShowAddEvent}
          />
        ) : (
          ""
        )}
      </div>
      <div className="event-form-container"></div>
      <div className="event-content-container">
        <FilterButtons />
        <EventList />
      </div>
    </section>
  );
}
