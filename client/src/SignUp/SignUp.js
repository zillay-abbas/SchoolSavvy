import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import axios from "../App/axios.js";
import Footer from "../SignIn/LoginFooter/Footer";
import Header from "../SignIn/LoginHeader/Header";

import "../SignIn/SignIn.css";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [emailError, setEmailError] = useState("");

  const [fillErr, setFillErr] = useState("");
  
  let navigate = useNavigate();

  const validatePassword = (value) => {
    setPassword(value);

    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }) ||
      !value
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };

  const validateConPassword = (pass) => {
    setCpassword(pass);

    if (pass === password || !pass) {
      setConfirmPass("");
    } else {
      setConfirmPass("Enter same password");
    }
  };

  const validateEmail = (email) => {
    setEmail(email);

    if (validator.isEmail(email) || !email) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "" || cpassword === "") {
      setFillErr("Please fill form complete");
    } else {
      const credentials = {
        name: username,
        email: email,
        password: password,
        password2: cpassword,
      };

      axios
        .post("v1/user/register", credentials)
        .then((result) => {
          if (result.data.error === true) {
            alert(result.data.msg);
          } else {
            console.log(result.data);
            // history.push("/login");
            navigate("/login");
            alert(result.data.msg);
          }
        })
        .catch((error) => {
          alert(`error ${error}`);
        });
    }
  };

  const handleFocus = async (e) => {
    setFillErr("");
  }

  return (
    <div className="frm-clr">
      <Header />
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
                  onFocus={handleFocus}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                  onFocus={handleFocus}
                  onChange={(e) => validateEmail(e.target.value)}
                />
                <span
                  style={{
                    fontWeight: "",
                    color: "red",
                  }}
                >
                  {emailError}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                  onFocus={handleFocus}
                  onChange={(e) => validatePassword(e.target.value)}
                />
                <span
                  style={{
                    fontWeight: "",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  required="required"
                  onFocus={handleFocus}
                  onChange={(e) => validateConPassword(e.target.value)}
                />
                <span
                  style={{
                    fontWeight: "",
                    color: "red",
                  }}
                >
                  {confirmPass}
                </span>
              </div>
              <div className="form-group">
                {/* <a className="form-btn" href="/register/subscription"> */}
                <button
                  className="form-group-btn"
                  type="submit"
                  onClick={handleRegister}
                  // onClick={() => setModalShow(true)}
                >
                  Register
                </button>
                {/* </a> */}
              </div>

              <span
                  style={{
                    fontWeight: "",
                    color: "red",
                  }}
                >
                  {fillErr}
                </span>

              <div className="form-group">
                <a className="form-recovery" href="/login">
                  Already have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
