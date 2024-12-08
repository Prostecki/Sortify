import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import Habits from "./pages/Habits";
import Onboarding from "./pages/Onboarding";
// import { GlobalProvider } from "./context/GlobalProvider";
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { username: "", password: "" };
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Onboarding setFormData={setFormData} formData={formData} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/habits" element={<Habits />} />
      </Routes>
    </>
  );
}

export default App;
