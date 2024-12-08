import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { section } from "motion/react-client";

export default function Register({ closeModal }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!registerUsername.trim() || !registerPassword.trim()) {
      setErrorMessage("Both username and password are required.");
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
    setSuccessfulMessage("Registration successful! You can now log in.");
    setTimeout(() => {
      closeModal();
    }, 1500);
  };

  return (
    <section className="absolute inset-0 w-full h-full bg-black/60 flex flex-col items-center justify-center">
      <div className="max-w-80 min-w-40 bg-white p-5 h-auto flex flex-col items-center">
        <h1>Welcome and Sign up!</h1>
        <button className="login-button text-center" onClick={closeModal}>
          X
        </button>
        <input
          type="text"
          placeholder="Enter username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button" onClick={handleRegister}>
          Register
        </button>
        {errorMessage ? (
          <h1 className={`text-red-500 mt-5 ${shake ? "shake" : ""}`}>
            {errorMessage}
          </h1>
        ) : (
          ""
        )}
        {successfulMessage ?? <h1>{successfulMessage}</h1>}
      </div>
    </section>
  );
}
