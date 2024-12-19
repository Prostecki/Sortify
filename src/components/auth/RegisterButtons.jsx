import { FcGoogle } from "react-icons/fc";

export default function RegisterButtons({ onRegister, onGoogleRegister }) {
  return (
    <div className="register-buttons-container">
      <button className="register-button" onClick={onRegister}>
        Create an account
      </button>
      <button
        className="bg-slate-400 register-button duration-300"
        onClick={onGoogleRegister}
      >
        <FcGoogle className="mr-2" /> Continue with google
      </button>
    </div>
  );
}
