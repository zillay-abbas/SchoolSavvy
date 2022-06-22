import React from "react";
import "./HomeFooter.css";

const HomeFooter = () => {
  return (
    <div className="home-footer">
      <section id="footer">
        <div className="container">
          <div className="row text-sm-left text-md-left">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <ul className="list-unstyled center-item quick-links">
                <li className="float-left">
                  <a href="/" className="text-left">
                    <i className="fa fa-angle-double-right"> </i> Blog
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Demo
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> FAQ
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Terms of
                    Services
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4">
              <ul className="list-unstyled center-item quick-links">
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Help
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Login
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Parther
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> Documentation
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fa fa-angle-double-right"> </i> About us
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-xs-12 center-item text-white col-sm-4 col-md-4">
              <h5>Contact us</h5>
              <ul className="list-unstyled quick-links">
                <li>
                  <i className="zmdi zmdi-phone"> </i> Phone +923065512906
                </li>
                <li>
                  <i className="zmdi zmdi-whatsapp"></i> Whatsapp +923065512906
                </li>
                <li>
                  <i className="zmdi zmdi-email"></i> Email
                  welcome@schoolsavvy.com
                </li>
              </ul>
            </div>

            <div className="row">
              <div className="col-xs-12 center-item col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-facebook"> </i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-twitter"> </i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-instagram"> </i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-google-plus"> </i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="/">
                      <i className="fa fa-envelope"> </i>
                    </a>
                  </li>
                  <li className="list-inline-item"></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-light">
              <i>&copy;2021 SchoolSavvy. All right Reversed.</i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFooter;
