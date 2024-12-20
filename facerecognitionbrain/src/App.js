import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignInPage/SignIn";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage onLogout={handleLogOut} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
