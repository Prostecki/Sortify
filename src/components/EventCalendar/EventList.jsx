import { useEventCalendarContext } from "../../context/eventCalendarContext";
import { useUserContext } from "../../context/UserContext";

export default function EventList() {
  const { filteredEvents, deleteEvent } = useEventCalendarContext();
  const { user } = useUserContext();

  return (
    <div className="flex">
      <ul>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li
              className={`border border-black p-5 rounded-xl my-10 ${
                new Date(event.start) < new Date()
                  ? "text-gray-500"
                  : "text-black"
              }`}
              key={event.id}
            >
              <h3 className="font-semibold">{event.name}</h3>
              <p>
                Start: {new Date(event.start).toLocaleString()} - End:{" "}
                {new Date(event.end).toLocaleString()}
              </p>
              <div>
                <p>
                  Added by:{" "}
                  {event.userId === user?.id ? user?.username : "Unknown"}
                </p>
              </div>
              <button
                onClick={() => deleteEvent(event.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">
            No events found for the selected filter.
          </p>
        )}
      </ul>
    </div>
  );
}
