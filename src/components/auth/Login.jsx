import Register from "./Register";
import "./Login.css";
import { FaBoltLightning } from "react-icons/fa6";
import { ImConnection } from "react-icons/im";
import { useUserContext } from "../../context/UserContext";

export default function Login() {
  const {
    userName,
    password,
    errorMessage,
    showRegister,
    handleLogin,
    setPassword,
    setUsername,
    setShowRegister,
    shake,
  } = useUserContext();

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
        {showRegister && <Register />}
      </section>
    </>
  );
}
