import { useEventCalendarContext } from "../../context/EventCalendarContext";

export default function EventEditionForm() {
  const {
    newName,
    newStart,
    newEnd,
    setNewName,
    setNewStart,
    setNewEnd,
    handleSave,
    editingEventId,
    setEditingEventId,
  } = useEventCalendarContext();

  return (
    <section className="event-list-editing-container">
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
          onClick={() => handleSave(editingEventId)}
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
    </section>
  );
}
