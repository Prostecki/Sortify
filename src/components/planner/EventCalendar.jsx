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

  const handleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
    setError(null);
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
        <button
          style={{
            opacity: showForm ? "0" : "1",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleForm}
          className="addtaskbtn"
        >
          Add Event
        </button>
        <div
          style={{
            opacity: showForm ? "1" : "0",
            transition: "all 0.5s ease-in-out",
          }}
          className={`event-form-container`}
        >
          <EventForm handleForm={handleForm} />
        </div>
      </div>
      <div className="event-form-container"></div>
      <div className="event-content-container">
        <FilterButtons />
        <EventList />
      </div>
    </section>
  );
}
