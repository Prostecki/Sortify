import { useState } from "react";
export default function EventForm({ onAddEvent }) {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !start || !end) {
      alert("Fill all fields.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name,
      start,
      end,
    };

    onAddEvent(newEvent);
    setName("");
    setStart("");
    setEnd("");
  };

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
