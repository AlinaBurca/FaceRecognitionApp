import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignInPage/SignIn";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./pages/RegisterPage/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage onLogout={handleLogOut} />
              </ProtectedRoute>
            ) : (
              <Navigate to="/signIn" replace />
            )
          }
        />
        <Route path="/signIn" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
