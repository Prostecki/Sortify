import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useStorage";
import "./loginform.css";

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
      <section className={`login-form ${shake ? "shake" : ""}`}>
        <input
          type="text"
          placeholder="Enter username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log in</button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </section>
    </>
  );
}
