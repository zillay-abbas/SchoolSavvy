import React, { useState } from "react";
import validator from "validator";
import Modal from "react-bootstrap/Modal";

import axios from "../App/axios.js";
import Footer from "../SignIn/LoginFooter/Footer";
import Header from "../SignIn/LoginHeader/Header";
import { Package } from "./Package/Package";

import "../SignIn/SignIn.css";
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [modalShow, setModalShow] = useState(false);

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

  const [emailError, setEmailError] = useState("");

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
      <Header />

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Package />
      </Modal>

      <div className="form ">
        <div className="form-panel one">
          <div className="form-header">
            <h1>Register Account</h1>
          </div>

          <div className="form-content">
            {/* <form> */}
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
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                required="required"
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

            <div className="form-group">
              <a className="form-recovery" href="/login">
                Already have an account?
              </a>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
