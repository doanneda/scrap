import './App.css';
import CreatePage from './CreatePage.js';
import Profile from './Profile.js';

import Feed from './Feed.js';
import DragAndDrop from './DrapAndDrop.jsx';

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react"; // To manage login status within component
import Signup from "./components/Signup-new";
import Login from "./components/Login-new";

function App() {
    const [user, setUser] = useState(() => {
        // Initialize user state from localStorage
        const token = localStorage.getItem("token");
        return token ? true : false; // Or decode and validate the token if necessary
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(true); // Optionally, validate the token here
        } else {
            setUser(false);
        }
    }, []);

    return (
        <Routes>
            {/* If the user is logged in, show Main, otherwise navigate to /login */}
            <Route path="/" element={user ? <Feed /> : <Navigate replace to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPage" element={<CreatePage />} />
            <Route path="/dnd/:pageId" element={<DragAndDrop />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/createpage" element={<CreatePage />} />
            <Route path="/profile/:userId" element={user ? <Profile /> : <Navigate replace to="/login" />} />
        </Routes>
    );

}

export default App;