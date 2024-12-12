<<<<<<< Updated upstream:src/pages/Dashboard.jsx
import { useUserContext } from "../context/UserContext";
=======
<<<<<<< HEAD:src/pages/DashboardPage.jsx
// import EventCalendar from "../components/planner/EventCalendar";
=======
import { useUserContext } from "../context/UserContext";
>>>>>>> d88b17f006a5e28b3f57e0c4d2e806fcde44d65a:src/pages/Dashboard.jsx
>>>>>>> Stashed changes:src/pages/DashboardPage.jsx
import Nav from "../layout/Nav";

export default function Dashboard({ setIsLoggedIn }) {
  return (
    <>
      <Nav setIsLoggedIn={setIsLoggedIn} />
      <h1 className="text-center text-[3rem]"> Dashboard/Home </h1>
      <h1 className="text-center text-[2rem]">
        User sees this page upon authentication (Logged in)
      </h1>
      <h1 className="text-center text-[3rem]"> Greet user. Hi (User) </h1>
      <h1 className="text-center text-[3rem]">
        Random Quote via API everytime user enters the Dashboard
      </h1>
      <h1 className="text-center text-[3rem]">
        Overview showing user activity. Minimalistic.
      </h1>
    </>
  );
}
