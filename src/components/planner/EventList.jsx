import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { useUserContext } from "../../context/UserContext";

export default function EventList() {
  const { filteredEvents, deleteEvent, updateEvents } =
    useEventCalendarContext();
  const { user } = useUserContext();

  const [editingEventId, setEditingEventId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setNewName(event.name);
    setNewStart(event.start);
    setNewEnd(event.end);
  };

  const handleSave = (id) => {
    if (!newName.trim() || !newStart.trim() || !newEnd.trim()) return;

    updateEvents(id, {
      name: newName,
      start: newStart,
      end: newEnd,
    });

    setEditingEventId(null);
    setNewName("");
    setNewStart("");
    setNewEnd("");
  };

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
                <div className="event-list-editing-container">
                  <div className="event-list-editing-inputs-container">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="editing-input"
                    />
                    <input
                      type="datetime-local"
                      value={newStart}
                      onChange={(e) => setNewStart(e.target.value)}
                      className="editing-input"
                    />
                    <input
                      type="datetime-local"
                      value={newEnd}
                      onChange={(e) => setNewEnd(e.target.value)}
                      className="editing-input"
                    />
                  </div>
                  <div className="event-list-editing-buttons-container">
                    <button
                      onClick={() => handleSave(event.id)}
                      className="editing-button bg-green-500 hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEventId(null)}
                      className="editing-button bg-gray-500 hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
