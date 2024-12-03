import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setUser(false); // Update user state in App.js
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
      <div className="links">
        <button onClick={handleLogout} className="button">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;