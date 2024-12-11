import { useEventCalendarContext } from "../../context/eventCalendarContext";
export default function EventList() {
  const { events, onDeleteEvent } = useEventCalendarContext();
  return (
    <ul>
      {events.map((event) => (
        <li
          key={event.id}
          style={{
            color: new Date(event.start) < new Date() ? "gray" : "black",
          }}
        >
          <h3>{event.name}</h3>
          <p>
            Start: {new Date(event.start).toLocaleString()} - End:{" "}
            {new Date(event.end).toLocaleString()}
          </p>
          <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
