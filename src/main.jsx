import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider.jsx";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GlobalProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </GlobalProvider>
    </Router>
  </StrictMode>
);
