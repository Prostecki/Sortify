import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
export default function Nav() {
  const { handleDarkMode, darkMode } = useThemeContext();
  return (
    <>
      <nav className="flex text-[40px] gap-[20px] justify-center">
        <Link to="/">Home</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleDarkMode}>
          {darkMode ? "Turn off" : "Turn on"}
        </button>
      </nav>
    </>
  );
}
