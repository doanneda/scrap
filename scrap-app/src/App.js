import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import Profile from './Profile.js';

import Feed from './Feed.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
