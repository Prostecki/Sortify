import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function ProfilePage({ setIsLoggedIn }) {
  const { error, quote, getQuote } = useUserContext();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      getQuote();
    }, 500);
  }, []);

  const navigate = useNavigate();

  const { deleteAccount } = useAccount(navigate, setIsLoggedIn);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
      <Nav />
      <section className="flex flex-col gap-5 items-center h-screen">
        <div className="flex flex-col ">
          <h1 className="text-center text-5xl my-5">
            Greetings,{" "}
            <span className="">
              {username ? capitalize(username) : "No user logged in"}
            </span>
          </h1>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              {Array.isArray(quote) && quote.length > 0 ? (
                quote.map((item, i) => (
                  <div key={i}>
                    <blockquote className="italic font-bold text-center border border-slate-400 rounded-lg px-5 py-2 my-5">
                      The quote of day: {item.quote}
                    </blockquote>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 justify-center my-5">
                  <img
                    className="w-9 text-center animate-spin"
                    src="/src/assets/loading.png"
                  />
                  <p>Loading..</p>
                </div>
              )}
            </>
          )}
        </div>

        <button
          className="px-5 py-1 text-xl border border-black text-white font-bold rounded-lg drop-shadow-md bg-sortify cursor-pointer hover:scale-105 hover:bg-slate-500 transition-all duration-200"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </section>
    </>
  );
}
