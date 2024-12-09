import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useState, useEffect } from "react";

export default function ProfilePage({ setIsLoggedIn }) {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const { handleLogOut, deleteAccount } = useAccount(navigate, setIsLoggedIn);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser from localStorage:", currentUser);

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
        </div>

        <button
          className="px-2 border border-black rounded-lg drop-shadow-md bg-sortify text-white cursor-pointer"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </section>
    </>
  );
}
