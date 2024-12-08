import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import Habits from "./pages/Habits";
import Onboarding from "./pages/Onboarding";
import { GlobalProvider } from "./context/GlobalProvider";
import "./App.css";

function App() {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>
      </GlobalProvider>
    </>
  );
}

export default App;
