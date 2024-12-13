import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function ProfilePage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const { deleteAccount } = useAccount(navigate, setIsLoggedIn);

  return (
    <>
      <Nav />
      <section className="flex flex-col gap-5 items-center h-screen">
        <div className="flex flex-col "></div>

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
