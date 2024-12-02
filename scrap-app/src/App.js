// import './App.css';
// import CreatePage from './CreatePage.js';
// import Profile from './Profile.js';
// import Feed from './Feed.js';
// import DragAndDrop from './DrapAndDrop.jsx';

// import { Route, Routes, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react"; // To manage login status within component
// import Signup from "./components/Signup-new";
// import Login from "./components/Login-new";
// import Navbar from "./components/Navbar/navbar";

// function App() {
//     const [user, setUser] = useState(() => {
//         // Initialize user state from localStorage
//         const token = localStorage.getItem("token");
//         return token ? true : false; // Or decode and validate the token if necessary
//     });

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             setUser(true); // Optionally, validate the token here
//         } else {
//             setUser(false);
//         }
//     }, []);

//     return (
//         <>
//             {/* Show Navbar only if the user is logged in */}
//             {user && <Navbar />}

//             <Routes>
//                 {/* If the user is not logged in, navigate to /login */}
//                 <Route path="/" element={user ? <Feed /> : <Navigate replace to="/login" />} />
//                 {/* <Route path="/signup" element={<Signup />} />
//                 <Route path="/login" element={<Login />} /> */}
        
//                 {/* If the user is logged in, redirect to / */}
//                 <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
                
//                 {/* If the user is logged in, redirect to / */}
//                 <Route path="/signup" element={user ? <Navigate replace to="/" /> : <Signup />} />


//                 <Route path="/dnd" element={user ? <DragAndDrop /> : <Navigate replace to="/login" />} />
//                 {/* <Route path="/feed" element={<Feed />} /> */}
//                 <Route path="/createpage" element={<CreatePage />} />
//                 <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate replace to="/login" />} />
//             </Routes>
            
//         </>
//     );

// }

// export default App;

import './App.css';
import CreatePage from './CreatePage.js';
import Profile from './Profile.js';
import Feed from './Feed.js';
import DragAndDrop from './DrapAndDrop.jsx';

import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup-new";
import Login from "./components/Login-new";
import Navbar from "./components/Navbar/navbar";

function App() {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? true : false; // Check if a token exists on initialization
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUser(!!token); // Update user state based on token
    }, []);

    return (
        <>
            {/* Pass user and setUser to Navbar; only show Navbar if usr is logged in */}
            {user && <Navbar user={user} setUser={setUser} />}

            <Routes>
                {/* Redirect non-logged-in users to /login */}
                <Route path="/" element={user ? <Feed /> : <Navigate replace to="/login" />} />
                <Route path="/dnd" element={user ? <DragAndDrop /> : <Navigate replace to="/login" />} />
                <Route path="/createpage" element={user ? <CreatePage /> : <Navigate replace to="/login" />} />
                <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate replace to="/login" />} />

                {/* Redirect logged in users to / (feed) */}
                <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login setUser={setUser} />} />
                <Route path="/signup" element={user ? <Navigate replace to="/" /> : <Signup />} />
            </Routes>
        </>
    );
}

export default App;
