import { useState } from "react";
import "./Login.css";
import { useUserContext } from "../../context/UserContext";

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const { closeModal } = useUserContext();

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
    <section className="section-container">
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <button className="close-button" onClick={closeModal}>
          X
        </button>
        <input
          type="text"
          placeholder="Choose username"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Choose password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="login-input"
        />
        <button className="register-button" onClick={handleRegister}>
          Sign up
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
