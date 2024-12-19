import { useContext, createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { getItemL } = useLocalStorage();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return savedIsLoggedIn === "true";
  });

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [quote, setQuote] = useState([]);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState(
    () => getItemL("currentUser") ?? {}
  );
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerTerms, setRegisterTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const getQuote = async () => {
    try {
      const response = await fetch(
        "https://api.breakingbadquotes.xyz/v1/quotes"
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setQuote(data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (savedIsLoggedIn === "true") {
      const savedUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const savedEvents =
        JSON.parse(localStorage.getItem(`events_${user.id}`)) || [];
      setEvents(savedEvents);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`events_${user.id}`, JSON.stringify(events));
    }
  }, [events, user]);

  const handleShowRegister = () => {
    setShowRegister(false);
    setTimeout(() => {
      setShowRegister(true);
    }, 100);
  };

  const closeModal = () => {
    setShowRegister(false);
    console.log("closed?");
  };

  const handleRegister = () => {
    if (
      !registerUsername.trim() ||
      !registerPassword.trim() ||
      !registerTerms
    ) {
      setErrorMessage("You must fill in all the fields.");
      setShake(false);
      setTimeout(() => setShake(true), 10);
      return;
    }

    const newUser = {
      username: registerUsername,
      password: registerPassword,
    };

    const usersData = localStorage.getItem("users");
    const users = usersData ? JSON.parse(usersData) : [];

    if (users.find((user) => user.username === registerUsername)) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setRegisterUsername("");
    setRegisterPassword("");
    setErrorMessage("");
    setSuccessfulMessage("Registration successful! You can now log in.");
    setTimeout(() => {
      closeModal();
    }, 1500);
  };

  const handleGoogleRegister = () => {
    alert("Just shows here. No actual functionality.");
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        password,
        errorMessage,
        closeModal,
        isLoggedIn,
        setIsLoggedIn,
        setUsername,
        setPassword,
        shake,
        setShake,
        showRegister,
        setShowRegister,
        getQuote,
        quote,
        activeUser,
        user,
        setUser,
        events,
        setEvents,
        handleShowRegister,
        handleRegister,
        handleGoogleRegister,
        registerUsername,
        registerTerms,
        registerPassword,
        errorMessage,
        shake,
        successfulMessage,
        setRegisterUsername,
        setRegisterPassword,
        setRegisterTerms,
        navigate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User context error");
  }
  return context;
}
