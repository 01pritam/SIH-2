// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import Login from "./components/login/Login"; // Import your Login component here
// // import Home from "./components/home/Home";
// // import Projects from "./components/projects/Projects";
// // import Navbar from "./components/navbar/Navbar";

// // function App() {
// //   const [loginUser, setLoginUser] = useState(null);

// //   return (
// //     <Router>
// //       <Navbar/>
// //       {/* Define your routes within the Router */}
// //       <Routes>
// //         {/* Define your routes using Route components */}
// //         <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />

// //         <Route path="/" element={<Home setLoginUser={setLoginUser} />} />

// //         <Route path="/projects" element={<Projects/>} />

// //         {/* Add other routes as needed */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/login/Login"; // Import your Login component here
// import Home from "./components/home/Home";
// import Projects from "./components/projects/Projects";
// import Navbar from "./components/navbar/Navbar";
// import ContestPage from "./components/contest/Contest";

// function App() {
//   const [loginUser, setLoginUser] = useState(null);
//   const [authToken, setAuthToken] = useState(null);

//   useEffect(() => {
//     // Get the auth token from local storage when the component mounts
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       setAuthToken(token);
//       console.log("Auth Token:", token); // Log the token here
//     }
//   }, []);

//   return (
    
//     <Router>
      
//       <Navbar  authToken={authToken} />
//       {/* Define your routes within the Router */}
//       <Routes>
//         {/* Define your routes using Route components */}
//          <Route
//           path="/login"
//           element={<Login setLoginUser={setLoginUser} setAuthToken={setAuthToken} />}
//         /> 

//         <Route
//           path="/"
//           element={<Home setLoginUser={setLoginUser} authToken={authToken} />}
//         />

//         <Route path="/projects" element={<Projects authToken={authToken} />} />
//         <Route path="/contests" element={<ContestPage authToken={authToken}/>} />


//         {/* Add other routes as needed */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Projects from "./components/projects/Projects";
import Navbar from "./components/navbar/Navbar";
import ContestPage from "./components/contest/Contest"

function App() {
  const [loginUser, setLoginUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Get the auth token from local storage when the component mounts
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      {authToken && <Navbar authToken={authToken} />} {/* Render Navbar conditionally */}
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={authToken ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={
            authToken ? (
              <Navigate to="/" replace />
            ) : (
              <Login setLoginUser={setLoginUser} setAuthToken={setAuthToken} />
            )
          }
        />

        <Route path="/projects" element={<Projects authToken={authToken} />} />
        <Route path="/contests" element={<ContestPage authToken={authToken}/>} />

      </Routes>
    </Router>
  );
}

export default App;
