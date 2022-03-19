import React, { useState } from "react";

import * as userConstant from "../App/Redux/constants/userConstant";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./LoginFooter/Footer";
import Header from "./LoginHeader/Header";
import { loginUser } from "../App/Redux/actions/userAction";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { createBrowserHistory } from "history";

import "./SignIn.css";

const SignIn = ({ setUserType }) => {
  const [email, setEmail] = useState("qwerfd");
  const [password, setPassword] = useState("asdfssdf");

  const [formError, setFormError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const handleFocus = async (e) => {
    setFormError("");
  };

  const isModalShow = async (e) => {
    if (email === "" || password === "") {
      setFormError("Please fill form complete");
    } else {
      setModalShow(true);
    }
  };

  const handleLogin = async (loginType) => {
    // e.preventDefault();

    setUserType(loginType);
    setModalShow(false);

    dispatch(loginUser(email, password, loginType));
    
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
              handleLogin(userConstant.ADMIN);
            }}
          >
            Admin
          </Button>
          <Button
            className="mt-3"
            variant="primary"
            onClick={() => {
              handleLogin(userConstant.TEACHER);
            }}
          >
            Teacher
          </Button>
          <Button
            className="mt-3"
            variant="success"
            onClick={() => {
              handleLogin(userConstant.STUDENT);
            }}
          >
            Student
          </Button>
          <Button
            className="mt-3"
            variant="info"
            onClick={() => {
              handleLogin(userConstant.PARENT);
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
                <button type="submit" onClick={isModalShow}>
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
