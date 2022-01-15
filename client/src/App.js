// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import LandingPage from "./pages/LandingPage.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Dashboard from "./pages/Dashboard.js";
import useToken from "./components/App/useToken.js";
import Contact from "./components/HomePage/Contact";
import Pricing from "./components/HomePage/Pricing.js";
import Features from "./components/HomePage/Features.js";

function App() {

  const { token, setToken } = useToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SignIn setToken = {setToken}/>} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/pricing" element={<Pricing />} />
        
        <Route path="/features" element={<Features />} />

        { token && <Route path="/dashboard" element={<Dashboard />}/> }

      </Routes>
    </Router>
  );
}

export default App;
