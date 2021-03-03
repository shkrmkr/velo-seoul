import React from "react";
import logo from "../assets/images/logo.png";

export const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <img className="top-bar__logo" src={logo} alt="velo seoul logo" />
    </div>
  );
};
