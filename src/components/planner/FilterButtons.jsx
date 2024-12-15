import { useEventCalendarContext } from "../../context/EventCalendarContext";
export default function FilterButtons() {
  const { setFilter } = useEventCalendarContext();
  return (
    <div className="event-filter-buttons-container">
      <button
        onClick={() => setFilter("upcoming")}
        className="event-filter-future-button"
      >
        Future events
      </button>
      <button
        onClick={() => setFilter("past")}
        className="event-filter-past-button"
      >
        Past events
      </button>
    </div>
  );
}
