import { useUserContext } from "../../context/UserContext";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { useRef } from "react";
import { BiHide } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
export default function EventForm({
  handleForm,
  setShowForm,
  setShowAddEvent,
}) {
  const {
    handleSubmit,
    name,
    start,
    end,
    setName,
    setStart,
    setEnd,
    error,
    shake,
    nameRef,
    startRef,
    endRef,
  } = useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <>
      <AnimatePresence>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="event-form-inner-form"
          onSubmit={(e) => handleSubmit(e, setShowForm, setShowAddEvent)}
        >
          {user ? (
            <>
              <h2 className="add-new-event-headline">Add a New Event</h2>
              <div className="flex items-center gap-2">
                <MdOutlineEmojiEvents style={{ opacity: 0.5 }} size={40} />
                <input
                  id="event-name"
                  className="event-form-input"
                  type="text"
                  placeholder="Enter event name"
                  value={name}
                  ref={nameRef}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-2 max-sm:flex-col max-sm:items-center">
                <div className="w-full max-sm:flex max-sm:items-center max-sm:justify-between">
                  <label htmlFor="start-date" className="event-form-label">
                    Start
                  </label>
                  <input
                    id="start-date"
                    className="event-form-input"
                    type="datetime-local"
                    value={start}
                    ref={startRef}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div className="w-full max-sm:flex max-sm:items-center max-sm:justify-between">
                  <label htmlFor="end-date" className="event-form-label">
                    End
                  </label>
                  <input
                    id="end-date"
                    className="event-form-input"
                    type="datetime-local"
                    value={end}
                    min={start || ""}
                    ref={endRef}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="addtaskbtn justify-center">
                <AiOutlinePlus size={22} />
              </button>
              <button
                type="button"
                onClick={handleForm}
                className="hidetaskbtn"
              >
                <BiHide size={25} color="white" />
              </button>
            </>
          ) : (
            <p className="text-gray-600">
              Please <span className="font-semibold text-blue-600">log in</span>{" "}
              to add events.
            </p>
          )}

          {error ? (
            <h1
              className={`text-red-500 text-center mt-5 ${
                shake ? "shake" : ""
              }`}
            >
              {error}
            </h1>
          ) : (
            <p>{""}</p>
          )}
        </motion.form>
      </AnimatePresence>
    </>
  );
}
