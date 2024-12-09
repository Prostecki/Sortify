export const useAccount = (navigate, setIsLoggedIn) => {
  const handleLogOut = () => {
    console.log("logging out...");
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
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

    // Обновляем статус логина
    localStorage.setItem("isLoggedIn", "false");

    // Обновляем состояние isLoggedIn
    setIsLoggedIn(false);

    navigate("/");
  };

  return { handleLogOut, deleteAccount };
};
