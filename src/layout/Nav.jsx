import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { PiUserListFill } from "react-icons/pi";

export default function Nav() {
  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard">
          <Logo />
        </Link>
        <div className="nav-right-position">
          <button className="logoutbtn">
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
