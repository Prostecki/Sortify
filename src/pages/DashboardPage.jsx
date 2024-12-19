import { use } from "react";
import Nav from "../layout/Nav";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useEventCalendarContext } from "../context/EventCalendarContext";
import { div } from "motion/react-client";
import { useHabitContext } from "../context/habitContext";

export default function DashboardPage() {
  const { events } = useEventCalendarContext();
  const { habits } = useHabitContext();
  const { setIsLoggedIn } = useUserContext();
  const [quote, setQuote] = useState(null);
  const [username, setUsername] = useState(null);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error("Error during loading a quote:", error);
      }
    };
    setTimeout(() => {
      fetchQuote();
    }, 500);
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
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <section className="flex-grow flex flex-col items-center">
        {username ? (
          <h1 className="text-4xl font-bold text-center my-5">{`Hello, ${capitalize(
            username
          )}`}</h1>
        ) : (
          <p>User is not defined</p>
        )}
        {quote ? (
          <h1 className="text-xl text-center my-5">{`${quote.author} said: ${quote.quote}`}</h1>
        ) : (
          <div className="flex items-center gap-2 w-full justify-center">
            <img
              className="w-8 animate-spin"
              src="/src/assets/loading.png"
              alt=""
            />
            <p className="text-center font-bold text-2xl">Loading...</p>
          </div>
        )}
        <div className="flex flex-col items-center gap-4 bg-slate-200 w-full">
          <h1 className="text-4xl font-bold tracking-wide">Your events</h1>
          {events.slice(0, 3).map((event) => (
            <div key={event.id}>{event.name}</div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 bg-purple-300 w-full">
          <h1 className="text-4xl font-bold tracking-wide">Your habits</h1>
          {habits.slice(0, 3).map((habit) => (
            <div key={habit.id}>{habit.name}</div>
          ))}
        </div>
      </section>
    </>
  );
}
