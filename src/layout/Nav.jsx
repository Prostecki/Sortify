import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";
import { useAccount } from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";

export default function Nav({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { handleLogOut } = useAccount(navigate, setIsLoggedIn);
  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard">
          <Logo />
        </Link>
        <div className="nav-right-position">
          <button onClick={handleLogOut} className="logoutbtn">
            <MdLogout size={17} className="mr-1" /> Logout
          </button>
          <Link to="/profile">
            <PiUserListFill size={40} className="profile-icon" />
          </Link>
        </div>
      </nav>
    </>
  );
}

// Dark mode kan vi applicera i slutet ifall det passar.

// Lägger till ytterliggare länkar längre in projektet. ( Tasks, Planner, Habits )
