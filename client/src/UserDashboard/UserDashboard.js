import React, { useState } from "react";

import Hamburger from './Hamburger/Hamburger'

import "./UserDashboard.css";

export const UserDashboard = () => {

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="dash-cont background-blue">
      <header className="head-cont">

        <div className="m-header">
          

          <a href="/" className="b-brand">
            <span className="logo">SchoolSavvy</span>
          </a>

          <a href="#!" className="mob-toggler" >
            <Hamburger className="hamburger-react" toggled={isOpen} isToggle={setOpen} />
          </a>
          
        </div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="#!" className="pop-search">
                <i className="feather icon-search"></i>
              </a>
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search hear"
                />
                <button type="button" className="close" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="dropdown">
                <a className="dropdown-toggle" href="/" data-toggle="dropdown">
                  <i className="icon feather icon-bell"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                    <div className="float-right">
                      <a href="#!" className="m-r-10">
                        mark as read
                      </a>
                      <a href="#!">clear all</a>
                    </div>
                  </div>
                  <ul className="noti-body ps">
                    <li className="n-title">
                      <p className="m-b-0">NEW</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder"
                        />
                        <div className="media-body">
                          <p>
                            <strong>John Doe</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              5 min
                            </span>
                          </p>
                          <p>New ticket Added</p>
                        </div>
                      </div>
                    </li>
                    <li className="n-title">
                      <p className="m-b-0">EARLIER</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-2.jpg"
                          alt="Generic placeholder"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              10 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Sara Soudein</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              12 min
                            </span>
                          </p>
                          <p>currently login</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="assets/images/user/avatar-2.jpg"
                          alt="Generic placeholder"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10"></i>
                              30 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <div
                      className="ps__rail-x"
                      style={{ left: "0px", bottom: "0px" }}
                    >
                      <div
                        className="ps__thumb-x"
                        tabindex="0"
                        style={{ left: "0px", width: "0px" }}
                      ></div>
                    </div>
                    <div
                      className="ps__rail-y"
                      style={{ top: "0px", right: "0px" }}
                    >
                      <div
                        className="ps__thumb-y"
                        tabindex="0"
                        style={{ top: "0px", height: "0px" }}
                      ></div>
                    </div>
                  </ul>
                  <div className="noti-footer">
                    <a href="#!">show all</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown drp-user">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="feather icon-user"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-notification">
                  <div className="pro-head">
                    <img
                      src="assets/images/user/avatar-1.jpg"
                      className="img-radius"
                      alt="User-Profile"
                    />
                    <span>John Doe</span>
                    <a
                      href="auth-signin.html"
                      className="dud-logout"
                      title="Logout"
                    >
                      <i className="feather icon-log-out"></i>
                    </a>
                  </div>
                  <ul className="pro-body">
                    <li>
                      <a href="user-profile.html" className="dropdown-item">
                        <i className="feather icon-user"></i> Profile
                      </a>
                    </li>
                    <li>
                      <a href="email_inbox.html" className="dropdown-item">
                        <i className="feather icon-mail"></i> My Messages
                      </a>
                    </li>
                    <li>
                      <a href="auth-signin.html" className="dropdown-item">
                        <i className="feather icon-lock"></i> Lock Screen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </header>
    </div>
  );
};
