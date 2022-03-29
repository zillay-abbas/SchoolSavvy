import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";

import LandingPage from "./LandingPage/LandingPage";
import Contact from "./LandingPage/Contact/Contact";
import Pricing from "./LandingPage/Pricing/Pricing";
import Features from "./LandingPage/Features/Features";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { Package } from "./SignUp/Package/Package";

import { UserDashboard } from "./UserDashboard/UserDashboard";


import useToken from "./App/useToken.js";
import { useSelector } from "react-redux";

function App() {
  const { authToken, setAuthToken } = useToken();
  const [userType, setUserType] = useState();

  const { token } = useSelector((state) => state.adminUser);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = authToken;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  function LoginAuth({ children, redirectTo }) {
    let isAuthenticated = authToken;
    return isAuthenticated ? <Navigate to={redirectTo} /> : children;
  }

  return (
    <Router history={createBrowserHistory}>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={
            <LoginAuth redirectTo="/user/dashboard">
              <SignIn set_token={setAuthToken} setUserType={setUserType} />
            </LoginAuth>
          }
        />

        <Route path="/register" element={<SignUp />} />

        <Route
          path="/user/dashboard/*"
          element={
            // <RequireAuth redirectTo="/login">
              <UserDashboard />
            // </RequireAuth>
          }
        />

        <Route path="/register/subscription" element={<Package />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/pricing" element={<Pricing />} />

        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}

export default App;
