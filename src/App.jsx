import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import EventCalendarPage from "./pages/EventCalendarPage";
import HabitsPage from "./pages/HabitsPage";
import OnboardingPage from "./pages/OnboardingPage";
import { useState, useEffect } from "react";
import "./App.css";
import { useUserContext } from "./context/userContext";

function App() {
  const { isLoggedIn, setIsLoggedIn, user } = useUserContext();

  // This effect runs only when `isLoggedIn` changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : { username: "", password: "" };
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <OnboardingPage
                setFormData={setFormData}
                formData={formData}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        {/* Private routes for logged users */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TasksPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/eventcalendar"
          element={
            isLoggedIn ? <EventCalendarPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/habits"
          element={isLoggedIn ? <HabitsPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
