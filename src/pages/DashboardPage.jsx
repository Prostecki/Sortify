import Nav from "../layout/Nav";
import { useEffect, useState } from "react";

export default function DashboardPage({ setIsLoggedIn }) {
  const [quote, setQuote] = useState(null);
  const [username, setUsername] = useState(null);
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        console.log(data);
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
      {username ? (
        <h1 className="text-4xl font-bold text-center my-5">{`Hello, ${capitalize(
          username
        )}`}</h1>
      ) : (
        <p>User is not defined</p>
      )}
      {quote ? (
        <h1 className="text-xl text-center my-5">{`${quote.author} said: ${quote.content}`}</h1>
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
    </>
  );
}
