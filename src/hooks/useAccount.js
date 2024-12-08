export const useAccount = (navigate) => {
  const handleLogOut = () => {
    sessionStorage.removeItem("currentUser");
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
    sessionStorage.removeItem("currentUser");
    navigate("/");
  };

  return { handleLogOut, deleteAccount };
};
