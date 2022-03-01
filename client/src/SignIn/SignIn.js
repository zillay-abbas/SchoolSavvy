import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../App/axios.js";

import Footer from "./LoginFooter/Footer";
import Header from "./LoginHeader/Header";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./SignIn.css";

const SignIn = ({ setToken, setUserType }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let history = useNavigate();
  // const [error, setError] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const handleLogin = async (loginType) => {
    // e.preventDefault();
    setUserType(loginType);
    setModalShow(false);

    axios
      .post("user/login", {
        email: email,
        password,
        userType: loginType,
      })
      .then((response) => {
        console.log(`result: ${response.data.msg}`);
        if (response.data.token) {
          setToken(response.data.token);
          history("/dashboard");
        }
      })
      .catch((error) => {
        setConfirmPass(error.response.data.msg);
        console.error("There was an error!", error.response.data.msg);
      });
  };

  return (
    <div className="frm-clr">
      {/* Header */}
      <Header />

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title id="contained-modal-title-vcenter">Login As</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column btn-group-lg">
          <Button
            className="mt-1"
            variant="secondary"
            onClick={() => {
              handleLogin("admin");
            }}
          >
            Admin
          </Button>
          <Button
            className="mt-3"
            variant="primary"
            onClick={() => {
              handleLogin("teacher");
            }}
          >
            Teacher
          </Button>
          <Button
            className="mt-3"
            variant="success"
            onClick={() => {
              handleLogin("student");
            }}
          >
            Student
          </Button>
          <Button
            className="mt-3"
            variant="info"
            onClick={() => {
              handleLogin("parent");
            }}
          >
            Parent
          </Button>
        </Modal.Body>
      </Modal>

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
                {confirmPass}
              </span>

              <div className="form-group">
                <button type="submit" onClick={() => setModalShow(true)}>
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
