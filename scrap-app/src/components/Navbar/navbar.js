import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios"; // Make sure you import axios


const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  // const [error, setError] = useState('');

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

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useParams } from 'react-router-dom';
// import "./navbar.css";
// import axios from "axios";


// const Navbar = ({ setUser }) => {
//   const { userId } = useParams();
//   const [currUser, setCurrUser] = useState(null); // Save full user data
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove the token
//     setUser(false); // Update user state in App.js
//     navigate("/login"); // Redirect to login page
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         console.log("Fetching user data...");
//         const res = await axios.get('http://localhost:4000/api/users/me');
//         console.log("User ID: ", res.data._id);
//         setCurrUser(res.data._id); // Save user ID
//       } catch (err) {
//         console.error("Error fetching user info:", err);
//         setError("Failed to load user information.");
//       }
//     }
//     fetchUser();
//   }, []);

//   const handleMyProfile = () => {
//     console.log("id is ", userId);

//     navigate(`/profile/${userId}`);
//     // if (currUser) {
//     //   console.log("Navigating to profile of user: ", currUser);
//     //   navigate(`/profile/${currUser}`); // Navigate to the profile page
//     // } else {
//     //   console.error("Current user is not logged in or ID is missing.");
//     //   setError("Failed to navigate to profile. Please try logging in again.");
//     // }
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">Your Logo</div>
//       <div className="links">
//         <button onClick={handleLogout} className="button">
//           Log Out
//         </button>
//         <button onClick={handleMyProfile} className="button">
//           My Profile
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// // WORKING CODEEEE
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./navbar.css";

// const Navbar = ({ setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove the token
//     setUser(false); // Update user state in App.js
//     navigate("/login"); // Redirect to login page
//   };

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