import React from "react";
import "./Navigation.css";
import Logo from "../Logo/Logo";
const Navigation = ({ onLogout }) => {
  return (
    <nav>
      <Logo />
      <p onClick={onLogout} className="f4 link dim black underline pointer">
        Sign out
      </p>
    </nav>
  );
};

export default Navigation;
