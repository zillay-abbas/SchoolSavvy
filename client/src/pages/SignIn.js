import React, { useState } from "react";
import HomeFooter from "../components/HomePage/HomeFooter.js";
import HomeHeader from "../components/HomePage/HomeHeader.js";
import axios from "../components/App/axios.js";
import "./SignIn.css";


async function loginUser(credentials) {
  return axios
    .post("admin/login", credentials)
    .then((response) => response)
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

const SignIn = ({ setToken }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await loginUser({
      email: username,      
      password
    });

    setToken(result);
    alert(result);
    
  };


  return (
    <div className="frm-clr">
      {/* Header */}
      <HomeHeader />

      {/* <!-- Form--> */}
      <div className="form">
        <div className="form-panel one">
          <div className="form-header">
            <h1>Account Login</h1>
          </div>

          <div className="form-content">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-remember">
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a className="form-recovery" href="/">
                  Forgot Password?
                </a>
              </div>

              {/* {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br /> */}

              <div className="form-group">
                <button type="submit" >Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default SignIn;
