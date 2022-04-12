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
 
  const { token } = useSelector((state) => state.user);

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
            <LoginAuth redirectTo="/dashboard">
              {/* set_token={setAuthToken} setUserType={setUserType} */}
              <SignIn  />
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
          path="/dashboard/*"
          element={
            <RequireAuth redirectTo="/login">
              <UserDashboard />
            </RequireAuth>
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
