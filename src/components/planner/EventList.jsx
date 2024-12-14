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
    <section className="flex flex-col ml-5 max-sm:ml-5">
      <ul className="w-full flex flex-col gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li
              className={`border drop-shadow-md p-5 rounded-xl ${
                new Date(event.start) < new Date()
                  ? "text-gray-500"
                  : "text-black"
              } bg-white transition-all sm:shadow-lg`}
              key={event.id}
            >
              {editingEventId === event.id ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                  />
                  <input
                    type="datetime-local"
                    value={newStart}
                    onChange={(e) => setNewStart(e.target.value)}
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                  />
                  <input
                    type="datetime-local"
                    value={newEnd}
                    onChange={(e) => setNewEnd(e.target.value)}
                    className="border px-2 py-1 rounded w-full sm:w-auto"
                  />
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={() => handleSave(event.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEventId(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3
                    onClick={() => handleEdit(event)}
                    className="font-semibold cursor-pointer mb-2 text-lg sm:text-xl p-1 text-start hover:bg-eventsBlue hover:text-white rounded-lg"
                  >
                    {event.name}
                  </h3>
                  <p className="text-sm sm:text-base">
                    Start: {new Date(event.start).toLocaleString()} - End:{" "}
                    {new Date(event.end).toLocaleString()}
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">
                      Added by:{" "}
                      {event.userId === user?.id ? user?.username : "Unknown"}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="mt-2 px-4 py-2 bg-eventsRed text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No events found for the selected filter.
          </p>
        )}
      </ul>
    </section>
  );
}
