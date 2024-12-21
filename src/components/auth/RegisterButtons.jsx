import { FcGoogle } from "react-icons/fc";
import { useUserContext } from "../../context/UserContext";

export default function RegisterButtons() {
  const { handleGoogleRegister, handleRegister } = useUserContext();
  return (
    <div className="register-buttons-container">
      <button className="register-button" onClick={handleRegister}>
        Create an account
      </button>
      <button
        className="bg-slate-400 register-button duration-300"
        onClick={handleGoogleRegister}
      >
        <FcGoogle className="mr-2" /> Continue with Google
      </button>
    </div>
  );
}
