import Nav from "../layout/Nav";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useEventCalendarContext } from "../context/EventCalendarContext";
import { useHabitContext } from "../context/habitContext";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useStorage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardPage() {
  const { events } = useEventCalendarContext();
  const { habits } = useHabitContext();
  const { setIsLoggedIn } = useUserContext();
  const [quote, setQuote] = useState(null);
  const [username, setUsername] = useState(null);
  const { getItemL } = useLocalStorage();

  // Då jag inte körde på Context så fetchar jag (Hasso) mina Tasks via localStorage.
  const tasks = getItemL("tasks", []);
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
      <section className="dashboard-container">
        <h1 className="dashboard-title"> Dashboard </h1>
        {username ? (
          <h1 className="text-3xl font-semibold text-center mt-6 mb-6 ">{`Hiya 👋🏼 ${capitalize(
            username
          )}`}</h1>
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
              <p className="font-medium mt-20">
                You're all done with your Tasks! 🎉
              </p>
            )}
            <Link to="/tasks" className="tasks-btn ">
              Go to Tasks
            </Link>
          </div>
          <div className="habits-stats">
            <h1 className="text-4xl font-bold drop-shadow-sm mt-7 text-gray-50 mb-10">
              Top Habits
            </h1>
            {habits.slice(0, 3).map((habit) => (
              <div className="each-habit" key={habit.id}>
                🔥 {habit.title}
              </div>
            ))}
            <Link to="/habits" className="habits-btn">
              Go to Habits
            </Link>
          </div>
          <div className="events-stats">
            <h1 className="text-4xl font-bold drop-shadow-sm mt-7 text-gray-50 mb-10">
              Upcoming Events
            </h1>
            {events.slice(0, 3).map((event) => (
              <div className="each-event" key={event.id}>
                📆 {event.name}
              </div>
            ))}
            <Link to="/eventcalendar" className="events-btn ">
              Go to Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
