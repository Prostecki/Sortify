import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import "./login.css";
import { FaBoltLightning } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";

export default function Login({ setIsLoggedIn }) {
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
    <>
      <section className="login-form">
        <h1 className="signin">
          Connect <ImConnection size={40} className="ml-3 drop-shadow-md" />
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        {errorMessage && (
          <p className={`text-red-500 ${shake ? "shake" : ""}`}>
            {errorMessage}
          </p>
        )}
        <div>
          <h4 className="m-2 font-semibold ">No account? Create one today!</h4>
          <button
            className="register-button"
            onClick={(e) => setShowRegister(true)}
          >
            Create account{" "}
            <FaBoltLightning size={17} className="ml-1 drop-shadow-md" />
          </button>
        </div>
        {showRegister && (
          <Register showRegister={showRegister} closeModal={closeModal} />
        )}
      </section>
    </>
  );
}
