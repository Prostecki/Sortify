import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocalStorage } from "../../hooks/UseLocalStorage";
import "./login.css";

export default function Form() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  // const [usersData, setUsersData] = useLocalStorage("users", []);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userName.trim() || !password.trim()) {
      setErrorMessage("Both username and password are required");
      setShake(false);
      setTimeout(() => setShake(true), 10);
      return;
    }

    const existingUser = usersData.find(
      (user) => user.username === userName && user.password === password
    );

    if (existingUser) {
      setErrorMessage("");
      navigate("/dashboard");
    } else {
      const newUser = { username: userName, password: password };
      setUsersData([...usersData, newUser]);
      setErrorMessage("New user registered! Logging in...");
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <>
      <section className={`login-form`}>
        <h1 className="text-3xl font-extrabold drop-shadow-md">Sign in!</h1>
        <div className="flex flex-col my-2">
          <label htmlFor="" className="font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Log in
        </button>
        <button className="login-button">Create Account</button>
        {errorMessage && (
          <p className={`text-red-500 ${shake ? "shake" : ""}`}>
            {errorMessage}
          </p>
        )}
      </section>
    </>
  );
}
