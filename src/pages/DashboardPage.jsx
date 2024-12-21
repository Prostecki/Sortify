import Nav from "../layout/Nav";
import { useEffect, useState, useMemo } from "react";
import { useUserContext } from "../context/UserContext";
import { useEventCalendarContext } from "../context/EventCalendarContext";
import { useHabitContext } from "../context/habitContext";

import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImStatsBars } from "react-icons/im";
import { CiCalendarDate } from "react-icons/ci";

export default function DashboardPage() {
  const { events } = useEventCalendarContext();
  const { habits } = useHabitContext();
  const { setIsLoggedIn } = useUserContext();
  const [quote, setQuote] = useState(null);
  const [username, setUsername] = useState(null);
  const { getItemL } = useLocalStorage();
  const { activeUser } = useUserContext();

  const allUsers = getItemL("users", []);

  const findUser = useMemo(
    () => allUsers.findIndex((user) => user.username === activeUser?.username),
    [allUsers, activeUser]
  );

  const upcomingEvents = events.filter((event) => {
    const eventStart = new Date(event.start);
    return eventStart >= new Date();
  });

  useEffect(() => {
    console.log("Tasks:", findUser?.tasks);
  }, [findUser]);

  const tasks = findUser !== -1 ? allUsers[findUser]?.tasks || [] : [];
  const incompleteTasks = tasks.filter((task) => !task.status);
  const recentIncompleteTasks = incompleteTasks.slice(0, 3);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();
        setQuote(data);
        toast(
          <div>
            <strong className="font-black">A Quote For You</strong>
            <hr className="mt-1 mb-1" />
            <p>{`${data.quote} - ${data.author}`}</p>
          </div>
        );
      } catch (error) {
        console.error("Error during loading a quote:", error);
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      setUsername(currentUser.username);
    } else {
      console.log("No user logged in");
    }
  }, []);

  return (
    <>
      <ToastContainer
        draggable
        position="bottom-center"
        className="flex justify-center text-center items-center cursor-pointer "
      />
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <section className="dashboard-container mb-[300px]">
        <h1 className="dashboard-title">
          {" "}
          Dashboard <ImStatsBars />{" "}
        </h1>
        <p className="task-description mt-2">
          A clear view of your priorities for ultimate{" "}
          <span className="text-orange-400">focus.</span>
        </p>
        {username ? (
          <h1 className="text-3xl font-semibold text-center mt-6 mb-6">
            Hiya <span className="animate-wave inline-block mr-1">👋🏼</span>
            {capitalize(username)}
          </h1>
        ) : (
          <p>User is not defined</p>
        )}

        <div className="stats-container">
          <div className="task-stats">
            <h1 className="text-4xl font-bold drop-shadow-sm mt-7 text-gray-50 mb-10">
              Recent Tasks
            </h1>
            {recentIncompleteTasks.length > 0 ? (
              recentIncompleteTasks.map((task) => (
                <div className="each-task" key={task.id}>
                  📦 {task.title}
                </div>
              ))
            ) : (
              <p className="font-medium text-xl mt-20">
                You&apos;re all done with your Tasks! 🎉
              </p>
            )}
            <Link to="/tasks" className="tasks-btn">
              Go to Tasks
            </Link>
          </div>
          <div className="habits-stats">
            <h1 className="text-4xl font-bold drop-shadow-sm mt-7 text-gray-50 mb-10">
              Top Habits
            </h1>
            {habits.length === 0 ? (
              <p className="font-medium text-xl mt-20">
                Start your first Habit today! 🚀
              </p>
            ) : (
              habits
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 3)
                .map((habit) => (
                  <div className="each-habit" key={habit.id}>
                    <p>
                      🔥 {habit.title} ({habit.amount})
                    </p>
                  </div>
                ))
            )}

            <Link to="/habits" className="habits-btn">
              Go to Habits
            </Link>
          </div>
          <div className="events-stats">
            <h1 className="text-4xl font-bold drop-shadow-sm mt-7 text-gray-50 mb-10">
              Upcoming Events
            </h1>
            {upcomingEvents.length === 0 ? (
              <p className="font-medium text-xl mt-20">No upcoming events 📆</p>
            ) : (
              upcomingEvents.slice(0, 3).map((event) => (
                <div className="each-event" key={event.id}>
                  <CiCalendarDate size={25} /> {event.name}
                </div>
              ))
            )}

            <Link to="/eventcalendar" className="events-btn ">
              Go to Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
