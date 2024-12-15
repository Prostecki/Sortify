import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { div } from "motion/react-client";
export default function EventForm() {
  const { handleSubmit, name, start, end, setName, setStart, setEnd, error } =
    useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <div className="event-form-outer">
      {user ? (
        <form onSubmit={handleSubmit} className="event-form-inner-form">
          <h2 className="add-new-event-headline">Add a New Event</h2>
          <div>
            <label htmlFor="event-name" className="event-form-label">
              Event Name
            </label>
            <input
              id="event-name"
              className="event-form-input"
              type="text"
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="start-date" className="event-form-label">
              Start Date & Time
            </label>
            <input
              id="start-date"
              className="event-form-input"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date & Time
            </label>
            <input
              id="end-date"
              className="event-form-input"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <button type="submit" className="event-form-submit-button">
            Add Event
          </button>
        </form>
      ) : (
        <p className="text-gray-600">
          Please <span className="font-semibold text-blue-600">log in</span> to
          add events.
        </p>
      )}
      {error ? <h1 className="animate-bounce">{error}</h1> : <p></p>}
    </div>
  );
}
