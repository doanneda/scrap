import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios"; // Make sure you import axios


const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setUser(false); // Update user state in App.js
    navigate("/login"); // Redirect to login page
  };

  const handleMyProfile = async () => {
    console.log("loggedInUserId: ", loggedInUserId)
    try {
      const res = await axios.get('http://localhost:4000/api/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
        const id = res.data._id; // Assuming the API returns the _id of the user
        navigate(`/profile/${id}`); // Redirect to the profile page
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogo = () => {
    navigate("/");
  }


  return (
    <nav className="navbar">
      <button onClick={handleLogo} className="logo">s c r a p</button>
      <div className="links">
        <button onClick={handleLogout} className="button">
          Log Out
        </button>
        <button onClick={handleMyProfile} className="button">
          My Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;