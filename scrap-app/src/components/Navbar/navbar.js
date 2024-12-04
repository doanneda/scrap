import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null); // Local state for user data
  const [error, setError] = useState(null); // Handle errors

  // Fetch the logged-in user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLocalUser(res.data); // Save the user data locally
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user information.");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setUser(null); // Update global user state (passed as prop)
    navigate("/login"); // Redirect to login page
  };

  const handleMyProfile = () => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`); // Navigate to user's profile page
    } else {
      console.error("User is not logged in or ID is missing.");
      setError("Failed to navigate to profile. Please try logging in again.");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
      <div className="links">
        {user ? (
          <>
            <button onClick={handleMyProfile} className="button">
              My Profile
            </button>
            <button onClick={handleLogout} className="button">
              Log Out
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </nav>
  );
};

export default Navbar;
