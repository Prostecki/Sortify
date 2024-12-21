import Register from "./Register";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { FaBoltLightning } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";
import { useUserContext } from "../../context/UserContext";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    userName,
    password,
    showRegister,
    setPassword,
    setUsername,
    handleShowRegister,
    shake,
    setIsLoggedIn,
    navigate,
  } = useUserContext();

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
          Sign in
        </button>
        {errorMessage && (
          <p className={`text-red-500 ${shake ? "shake" : ""}`}>
            {errorMessage}
          </p>
        )}
        <div>
          <h4 className="m-2 font-semibold ">No account? Create one today!</h4>
          <button className="register-button" onClick={handleShowRegister}>
            Create account{" "}
            <FaBoltLightning size={17} className="ml-1 drop-shadow-md" />
          </button>
        </div>
        {showRegister && <Register />}
      </section>
    </>
  );
}
