// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./navbar.css"; // Ensure your CSS is correctly imported

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // Check if the user is logged in on initial render (on mount)
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // If a token exists, set isLoggedIn to true
//   }, []); // Empty dependency array ensures this runs only once on mount

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token to log out
//     setIsLoggedIn(false); // Update state to reflect that the user is logged out
//     navigate("/login"); // Redirect to the login page
//   };

//   // // Render nothing if not logged in
//   // if (!isLoggedIn) return null;

//   return (
//     <nav className="navbar">
//       <div className="logo">Your Logo</div>
//       <div className="links">
//         <button onClick={handleLogout} className="button">
//           Log Out
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


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