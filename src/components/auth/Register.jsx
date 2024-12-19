import { useState } from "react";
import "./Login.css";
import { useUserContext } from "../../context/UserContext";
import { IoCloseOutline } from "react-icons/io5";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import RegisterButtons from "./RegisterButtons";
import Message from "./Message";

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerTerms, setRegisterTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState(false);
  const [shake, setShake] = useState(false);

  const { closeModal } = useUserContext();

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
    <section className="section-container">
      <div className="register-container">
        <div className="flex flex-col items-center gap-3 mb-5">
          <h1 className="register-title">Register</h1>{" "}
          <p className="text-center text-slate-400">
            Create an account with us
          </p>
        </div>
        <button className="close-button" onClick={closeModal}>
          <IoCloseOutline className="text-slate-200 hover:text-slate-800 duration-300 transition-all w-8 h-8" />
        </button>
        <div className="input-container">
          <InputField
            type="text"
            placeholder="Enter username"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="login-input"
          />
          <InputField
            type="password"
            placeholder="Enter password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="login-input"
          />
          <CheckboxField
            checked={registerTerms}
            onChange={(e) => setRegisterTerms(e.target.checked)}
            className="w-4"
          />
        </div>
        <RegisterButtons
          onRegister={handleRegister}
          onGoogleRegister={handleGoogleRegister}
        />
        <hr className="w-full" />
        <Message message={errorMessage} type="error" shake={shake} />
        <Message message={successfulMessage} type="success" />
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <button onClick={closeModal}>
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">
              Log in
            </a>
          </button>
        </p>
      </div>
    </section>
  );
}
