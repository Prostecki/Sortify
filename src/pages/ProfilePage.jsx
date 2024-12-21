import Nav from "../layout/Nav";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../hooks/useAccount";

export default function ProfilePage({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const { deleteAccount } = useAccount(navigate, setIsLoggedIn);

  return (
    <>
      <Nav />
      <div className="profile-container">
        <h1 className="profiletitle"> Profile </h1>
        <img src="src/assets/gif1.webp" alt="" />
        <h1 className="deletemsg">
          {" "}
          Deleting your account will remove all your data and history
          permanently and cannot be undone
        </h1>
        <button className="deletebtn" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  );
}
