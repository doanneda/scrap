import './App.css';
import CreatePage from './CreatePage.js';
import Profile from './Profile.js';

import Feed from './Feed.js';
import DragAndDrop from './DrapAndDrop.jsx';

import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup/index.jsx";
import Login from "./components/Login/index.jsx";
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
