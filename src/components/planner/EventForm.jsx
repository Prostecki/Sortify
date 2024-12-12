import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
export default function EventForm() {
  const { handleSubmit, name, setName, start, setStart, end, setEnd } =
    useEventCalendarContext();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button type="submit">Add event</button>
    </form>
  );
}
