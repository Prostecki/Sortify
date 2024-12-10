import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useState, useEffect } from "react";

export default function ProfilePage({ setIsLoggedIn }) {
  const [username, setUsername] = useState(null);
  // const [quote, setQuote] = useState(null);
  // const [error, setError] = useState(null);
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

  // useEffect(() => {
  //   const getQuote = async () => {
  //     try {
  //       const response = await fetch("https://api.quotable.io/random", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error(`HTTP Error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log(data.content);
  //       setQuote(data.content);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   getQuote();
  // }, []);

  return (
    <>
      <Nav />
      <section className="flex flex-col gap-5 items-center h-screen">
        <h1 className="text-center text-[3rem]"> Profile </h1>
        <h1 className="text-center text-[3rem]"> Button to go to Dashboard</h1>
        <h1 className="text-center text-[3rem]"> Fill in any other info</h1>
        <h1 className="text-center text-[3rem]">Delete & Logout btn</h1>
        <div className="flex flex-col ">
          <h1 className="text-4xl font-bold">
            Tjena,{" "}
            <span className="account-name">
              {username ? capitalize(username) : "No user logged in"}
            </span>
          </h1>
          {/* {error ? (
            <p>Error: {error}</p>
          ) : (
            <p>{quote ? quote : "Loading quote..."}</p>
          )} */}
        </div>

        <button
          className="px-2 border border-black text-black rounded-lg drop-shadow-md bg-sortify cursor-pointer"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </section>
    </>
  );
}
