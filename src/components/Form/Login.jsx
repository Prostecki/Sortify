import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import "./login.css";

export default function Form() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if there are empty fields at least one of them
    if (!userName.trim() || !password.trim()) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    let usersData = JSON.parse(localStorage.getItem("users"));
    let users = usersData ? usersData : [];
    //Kolla om det finns en anvandare med username + password
    let loggedInUser = users.find((user) => {
      return user.username === userName && user.password === password;
    });

    // If successful
    if (loggedInUser) {
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      setUsername("");
      setPassword("");
      setErrorMessage("");
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
    <>
      <section className={`login-form`}>
        <h1 className="text-3xl font-extrabold drop-shadow-md">Sign in!</h1>

        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>
        {errorMessage && (
          <p className={`text-red-500 ${shake ? "shake" : ""}`}>
            {errorMessage}
          </p>
        )}
        <div className="register-container">
          <h1 className="text-3xl font-bold drop-shadow-md mt-4">Register</h1>
          <h4 className=" mt-1 font-medium drop-shadow-md">
            No account? No worries! Click the button to begin
          </h4>
          <button
            className="login-button"
            onClick={(e) => setShowRegister(true)}
          >
            Create account
          </button>
        </div>
        {showRegister && (
          <Register showRegister={showRegister} closeModal={closeModal} />
        )}
      </section>
    </>
  );
}
