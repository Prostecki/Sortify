import EventList from "./EventList";
import EventForm from "./EventForm";
import FilterButtons from "./FilterButtons";
import { useState, useEffect } from "react";

import { useUserContext } from "../../context/UserContext";
export default function EventCalendar() {
  const { user } = useUserContext();

  const [tasks, setTasks] = useState(() => {
    if (!user) return [];

    const savedTasks = localStorage.getItem(user.username);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (user && tasks.length > 0) {
      localStorage.setItem(user.username, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  return (
    <section className="flex flex-col items-start sm:flex-row">
      <div className="flex flex-col w-max sm:flex sm:justify-center bg-eventsGrey relative">
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-5">
          Event Calendar
        </h1>
        <EventForm />
      </div>
      <div className="flex flex-col w-screen">
        <FilterButtons />
        <EventList />
      </div>
    </section>
  );
}
