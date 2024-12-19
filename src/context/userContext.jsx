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
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [quote, setQuote] = useState([]);
  const [error, setError] = useState(null);
  const [activeUser, setActiveUser] = useState(
    () => getItemL("currentUser") ?? {}
  );

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

  const handleLogin = () => {
    // Check if there are empty fields at least one of them
    if (!userName.trim() || !password.trim()) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = usersData.find(
      (user) => user.username === userName && user.password === password
    );

    // If successful
    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setErrorMessage("");
      navigate("/dashboard");
      setTimeout(() => location.reload(), 10);
    } else {
      setErrorMessage("User is not registered");
    }
  };

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

  return (
    <UserContext.Provider
      value={{
        userName,
        password,
        errorMessage,
        closeModal,
        handleLogin,
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
