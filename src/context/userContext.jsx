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

  const handleLogin = () => {
    // Check if there are empty fields at least one of them
    if (!userName.trim() || !password.trim()) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    let usersData = JSON.parse(localStorage.getItem("users"));
    console.log("Users from localStorage after parsing:", usersData);
    let users = usersData ? usersData : [];
    //Kolla om det finns en anvandare med username + password
    let loggedInUser = users.find((user) => {
      return user.username === userName && user.password === password;
    });

    // If successful
    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      localStorage.setItem("isLoggedIn", "true");
      setUsername("");
      setPassword("");
      setErrorMessage("");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setErrorMessage("User is not registered");
    }
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
        showRegister,
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
