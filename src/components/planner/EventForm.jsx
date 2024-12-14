import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { div } from "motion/react-client";
export default function EventForm() {
  const { handleSubmit, name, start, end, setName, setStart, setEnd, error } =
    useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <div className="bg-eventsGrey h-screen max-sm:w-screen max-sm:h-full p-4">
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 drop-shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800">Add a New Event</h2>

          {/* Event Name */}
          <div>
            <label
              htmlFor="event-name"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name
            </label>
            <input
              id="event-name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date & Time
            </label>
            <input
              id="start-date"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date & Time
            </label>
            <input
              id="end-date"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-sortify rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
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
