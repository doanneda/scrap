import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import CreatePage from './CreatePage.js';
import Profile from './Profile.js';
import DragAndDrop from './DrapAndDrop.jsx'

import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; // To manage login status within component
import Main from "./components/Main";
import Signup from "./components/Signup-new";
import Login from "./components/Login-new";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          setUser(true); // Token exists, so user is logged in
      } else {
          setUser(false); // No token, so user is not logged in
      }
  }, []);

    return (
        <Routes>
            {/* If the user is logged in, show Main, otherwise navigate to /login */}
            <Route path="/" element={user ? <CreatePage /> : <Navigate replace to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate replace to="/login" />} />
            <Route path="/dnd" element={user ? <DragAndDrop /> : <Navigate replace to="/login" />} />
        </Routes>
    );

}

export default App;