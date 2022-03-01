import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { createBrowserHistory } from "history";

import LandingPage from "./LandingPage/LandingPage";
import Contact from "./LandingPage/Contact/Contact";
import Pricing from "./LandingPage/Pricing/Pricing";
import Features from "./LandingPage/Features/Features";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import {Package} from "./SignUp/Package/Package";

import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { UserDashboard } from "./UserDashboard/UserDashboard";

import useToken from "./App/useToken.js";

function App() {

  const { token, setToken } = useToken();
  const [userType, setUserType] = useState();

  return (
    <Router history={createBrowserHistory}>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SignIn setToken = {setToken} setUserType = {setUserType}/>} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />

        <Route path="/register/subscription" element={<Package />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/pricing" element={<Pricing />} />
        
        <Route path="/features" element={<Features />} />

        { token && <Route path="/dashboard" element={<AdminDashboard />}/> }

      </Routes>
    </Router>
  );
}

export default App;
