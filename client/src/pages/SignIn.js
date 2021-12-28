import React from "react";
import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";
import "./SignIn.css";

const SignIn = () => {
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
                <label for="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
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
              <div className="form-group">
                <button type="submit">Log In</button>
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
