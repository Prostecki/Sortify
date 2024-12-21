import { useUserContext } from "../context/UserContext";

export const useAccount = (navigate) => {
  const { setIsLoggedIn } = useUserContext();
  const handleLogOut = () => {
    console.log("logging out...");
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");

    setIsLoggedIn(false);
    navigate("/");
  };

  const deleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("No user is logged in");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users"));

    users = users.filter((user) => user.username !== currentUser.username);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("currentUser");

    localStorage.setItem("isLoggedIn", "false");

    setIsLoggedIn(false);

    navigate("/");
  };

  return { handleLogOut, deleteAccount };
};
