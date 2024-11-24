// import logo from './logo.svg';
// import './App.css';
// import Login from './Login.js';

// import Feed from './Feed.js';
// import { BrowserRouter, Route, Routes } from "react-router-dom";


// export default function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<Feed />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }



// client/src/App.js
import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setLoggedInUser(null); // Set logged-in user to null
    };

    return (
        <div className="App">
            
            {loggedInUser ? (
                <div>
                    <p>Welcome {loggedInUser}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <Register />
                    <Login setLoggedInUser={setLoggedInUser} />
                </div>
            )}
        </div>
    );
};

export default App;