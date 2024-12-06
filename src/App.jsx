import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <h1>HEJ</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="'/login" element={<LoginPage />} />
        <Route path="'/profile" element={<ProfilePage />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
