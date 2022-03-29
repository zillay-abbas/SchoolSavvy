import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import LandingPage from "./LandingPage/LandingPage";
import Contact from "./LandingPage/Contact/Contact";
import Pricing from "./LandingPage/Pricing/Pricing";
import Features from "./LandingPage/Features/Features";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

import { UserDashboard } from "./UserDashboard/UserDashboard";

import { useSelector } from "react-redux";

function App() {
<<<<<<< HEAD
  const { authToken, setAuthToken } = useToken();
  const [userType, setUserType] = useState();

  const { token } = useSelector((state) => state.adminUser);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

=======
 
  const { token } = useSelector((state) => state.user);

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = token;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  function LoginAuth({ children, redirectTo }) {
    let isAuthenticated = token;
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
<<<<<<< HEAD
            <LoginAuth redirectTo="/user/dashboard">
              <SignIn set_token={setAuthToken} setUserType={setUserType} />
=======
            <LoginAuth redirectTo="/dashboard">
              {/* set_token={setAuthToken} setUserType={setUserType} */}
              <SignIn  />
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
            </LoginAuth>
          }
        />

        <Route
          path="/register"
          element={
            <LoginAuth redirectTo="/dashboard">
              <SignUp />
            </LoginAuth>
          }
        />

        <Route
          path="/user/dashboard/*"
          element={
<<<<<<< HEAD
            // <RequireAuth redirectTo="/login">
              <UserDashboard />
            // </RequireAuth>
=======
            <RequireAuth redirectTo="/login">
              <UserDashboard></UserDashboard>
            </RequireAuth>
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
