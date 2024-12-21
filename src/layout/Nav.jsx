import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useAccount } from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import { CgUserlane } from "react-icons/cg";

export default function Nav({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { handleLogOut } = useAccount(navigate, setIsLoggedIn);
  return (
    <>
      <nav className="navbar">
        <Link to="/dashboard">
          <Logo />
        </Link>
        <div className="nav-center-position">
          <Link className="linkhover" to="/eventcalendar">
            Events
          </Link>
          <Link className="linkhover" to="/habits">
            Habits
          </Link>
          <Link className="linkhover" to="/tasks">
            Tasks
          </Link>
        </div>
        <div className="nav-right-position">
          <button onClick={handleLogOut} className="logoutbtn text-[15px]">
            <MdLogout size={22} className="mr-1" /> Sign out
          </button>
          <Link to="/profile">
            <CgUserlane size={35} className="profile-icon" />
          </Link>
        </div>
      </nav>
    </>
  );
}

// Dark mode kan vi applicera i slutet ifall det passar.

// Lägger till ytterliggare länkar längre in projektet. ( Tasks, Events, Habits )
