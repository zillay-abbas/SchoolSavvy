import { result } from "lodash";
import React, { useState } from "react";
import axios from "../components/App/axios.js";

import HomeFooter from "../components/HomePage/HomeFooter.js";
import HomeHeader from "../components/HomePage/HomeHeader.js";

import "./SignIn.css";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();

    const credentials = {
      name: username,
      email: email,
      password: password,
      password2: cpassword,
    };

    axios
      .post("admin/register", credentials)
      .then((result) => {
        if (result.data.errors.length > 0) {
          alert(`then error ${result.data.errors[0].msg}`);
        } else {
          alert("User Added");
        }
      })
      .catch((error) => {
        alert(`err0r ${error}`);
      });
  };

  return (
    <div className="frm-clr">
      {/* Header */}
      <HomeHeader />

      <div className="form ">
        <div className="form-panel one">
          <div className="form-header">
            <h1>Register Account</h1>
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
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  required="required"
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" onClick={handleRegister}>
                  Register
                </button>
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

export default SignUp;
