import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./navbar.css";
import axios from "axios";


const Navbar = ({ setUser }) => {
  // const { userId } = useParams();
  const [currUser, setCurrUser] = useState(null); // Save full user data
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setUser(false); // Update user state in App.js
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/users/me');
        setCurrUser(res.user); // Save the full user object
        // setLoggedInUserId(res.data._id); // Save the user ID 
        // navigate(`/profile/${user}`); // Navigate to the profile page


      } catch (err) {
          console.error("Error fetching user info:", err);
          // setError("Failed to load user information.");
      }
    }
    fetchUser();
  }, []);

  const handleMyProfile = () => {
    if (currUser && currUser._id) {
      navigate(`/profile/${currUser}`); // Navigate to user's profile page
    } else {
      console.error("Current user is not logged in or ID is missing.");
      setError("Failed to navigate to profile. Please try logging in again.");
    }
  };


  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
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
