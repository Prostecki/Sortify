import { useEventCalendarContext } from "../../context/EventCalendarContext";
export default function FilterButtons() {
  const { setFilter } = useEventCalendarContext();
  return (
    <div className="my-5 flex max-sm:flex-row flex-row max-w-full gap-5 ml-5 justify-center">
      <button
        onClick={() => setFilter("upcoming")}
        className="w-[10rem] px-4 py-2 bg-eventsYellow text-black rounded hover:bg-blue-600 mr-2"
      >
        Future events
      </button>
      <button
        onClick={() => setFilter("past")}
        className="w-[10rem] px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Past events
      </button>
    </div>
  );
}
