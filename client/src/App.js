// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.js";
import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<SignIn />} />

        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
