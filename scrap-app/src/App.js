import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import CreatePage from './CreatePage.js';
import Profile from './Profile.js';
import DragAndDrop from './DrapAndDrop.jsx'

import Feed from './Feed.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<CreatePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dnd" element={<DragAndDrop />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}
