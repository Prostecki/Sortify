import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { useUserContext } from "../../context/UserContext";
import EventEditionForm from "./EventEditingForm";

export default function EventList() {
  const {
    filteredEvents,
    deleteEvent,
    updateEvents,
    editingEventId,
    handleEdit,
  } = useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <section className="event-list-container">
      <ul className="event-list-elements-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li
              className={`event-list-element ${
                new Date(event.start) < new Date()
                  ? "text-gray-500"
                  : "text-black"
              } `}
              key={event.id}
            >
              {editingEventId === event.id ? (
                <EventEditionForm />
              ) : (
                <>
                  <h3
                    onClick={() => handleEdit(event)}
                    className="event-list-name"
                  >
                    {event.name}
                  </h3>
                  <p className="event-list-date">
                    Start: {new Date(event.start).toLocaleString()} - End:{" "}
                    {new Date(event.end).toLocaleString()}
                  </p>
                  <div>
                    <p className="event-list-added-by">
                      Added by:{" "}
                      {event.userId === user?.id ? user?.username : "Unknown"}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="event-list-delete-button"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="event-list-noevents-message">
            No events found for the selected filter.
          </p>
        )}
      </ul>
    </section>
  );
}
