import { useState } from "react";
import { useEventCalendarContext } from "../../context/EventCalendarContext";
import { useUserContext } from "../../context/UserContext";
import EventEditionForm from "./EventEditingForm";
import { MdAccessTime } from "react-icons/md";
import { FaArrowRotateRight } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function EventList() {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const {
    filteredEvents,
    deleteEvent,
    updateEvents,
    editingEventId,
    handleEdit,
  } = useEventCalendarContext();

  const { user } = useUserContext();

  return (
    <ul className="event-list-elements-container">
      <AnimatePresence>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const eventStartDate = new Date(event.start);
            const eventEndDate = new Date(event.end);
            const day = eventStartDate.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const date = eventEndDate.getDate();
            const formattedStartDate = eventStartDate.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            const formattedEndDate = eventEndDate.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            const isPastEvent =
              eventStartDate < new Date() && eventEndDate < new Date();

            return (
              <motion.li
                className={`event-list-element ${
                  isPastEvent ? "text-gray-500" : "text-black"
                } `}
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {editingEventId === event.id ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <EventEditionForm />
                  </motion.div>
                ) : (
                  <>
                    <div
                      className={`${
                        isPastEvent ? "bg-slate-500" : "bg-sortify"
                      } drop-shadow-xl flex flex-col justify-center shrink-0 items-center p-8 w-14 h-14 rounded-lg`}
                    >
                      <div
                        className="text-2xl font-sans text-center drop-shadow-xl
                       text-white"
                      >
                        {date}
                      </div>
                      <div className="text-lg drop-shadow-xl text-center text-white">
                        {day}
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <div className="event-list-name-box">
                        <h3
                          onClick={() => handleEdit(event)}
                          className="event-list-name"
                        >
                          {capitalize(event.name)}
                        </h3>
                        <BsPencilSquare
                          onClick={() => handleEdit(event)}
                          size={18}
                          className="edit-icon"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="event-list-date">
                          <MdAccessTime size={25} /> {formattedStartDate}
                        </p>
                        <p className="event-list-date">
                          <FaArrowRotateRight size={25} />
                          {formattedEndDate}
                        </p>
                      </div>
                      <div>
                        <p className="event-list-added-by">
                          Added by:{" "}
                          {event.userId === user?.id
                            ? capitalize(user?.username)
                            : "Unknown"}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="event-list-delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            );
          })
        ) : (
          <p className="event-list-no-events-message">
            No events found for the selected filter.
          </p>
        )}
      </AnimatePresence>
    </ul>
  );
}
