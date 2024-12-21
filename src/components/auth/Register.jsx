import { useState } from "react";
import "./Login.css";
import { useUserContext } from "../../context/userContext";
import { IoCloseOutline } from "react-icons/io5";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import RegisterButtons from "./RegisterButtons";
import Message from "./Message";

export default function Register() {
  const {
    closeModal,
    registerUsername,
    registerPassword,
    registerTerms,
    errorMessage,
    shake,
    successfulMessage,
    setRegisterUsername,
    setRegisterPassword,
    setRegisterTerms,
  } = useUserContext();

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
        <RegisterButtons />
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
