import React, { useState } from "react";

import { useDispatch } from "react-redux";

import Footer from "./LoginFooter/Footer";
import Header from "./LoginHeader/Header";
<<<<<<< HEAD
import { loginUser } from "../App/Redux/actions/UserActions";
=======
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

import { loginUser } from "../App/Redux/Action/userActions";

import "./SignIn.css";

<<<<<<< HEAD
const SignIn = ({ setUserType }) => {
=======
const SignIn = () => {
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const history = createBrowserHistory();

  const { error, msg, token } = useSelector((state) => state.adminUser);

  const handleFocus = async (e) => {
    setFormError("");
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setFormError("Please fill form complete");
    } else {
      dispatch(loginUser(email, password));
    }
  };

  return (
    <div className="frm-clr">
      {/* Header */}
      <Header />

      {/* <!-- Form--> */}
      <div className="form">
        <div className="form-panel one">
          <div className="form-header">
            <h1>Account Login</h1>
          </div>

          <div className="form-content ">
            <div className="from-apply">
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                  onFocus={handleFocus}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  onFocus={handleFocus}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="remember-label">
                  <input className="remember-chk" type="checkbox" />
                  Remember Me
                </label>

                <a className="form-recovery" href="/">
                  Forgot Password?
                </a>
              </div>

              <span
                style={{
                  fontWeight: "",
                  color: "red",
                }}
              >
                {formError}
              </span>
              <div className="form-group">
                <button type="submit" onClick={handleLogin}>
                  Log In
                </button>
              </div>
            </div>

            <a className="link" href="/register">
              <div className="form-group">
                <button type="submit">Register</button>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignIn;
