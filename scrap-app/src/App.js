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

// import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
// import Signup from "./components/Signup-new";
// import Login from "./components/Login-new";

// function App() {
// 	const user = localStorage.getItem("token");

// 	return (
// 		<Routes>
// 			{user && <Route path="/" exact element={<Main />} />}
// 			<Route path="/signup" exact element={<Signup />} />
// 			<Route path="/login" exact element={<Login />} />
// 			<Route path="/" element={<Navigate replace to="/login" />} />
// 		</Routes>
// 	);
// }

// export default App;

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
        setUser(token); // Or validate the token here if needed (e.g., check expiration)
      } else {
        setUser(null);
      }
    }, []);

    return (
        <Routes>
            {/* If the user is logged in, show Main, otherwise navigate to /login */}
            <Route path="/" element={user ? <Main /> : <Navigate replace to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default App;