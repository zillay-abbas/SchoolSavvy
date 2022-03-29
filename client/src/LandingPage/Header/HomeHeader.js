import React from "react";

const HomeHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            SchoolSavvy
          </a>

          <button
            className="navbar-toggler mr-md-4"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse text-center"
            id="navbarColor02"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active mx-1">
                <a className="nav-link text-center" href="/features">
                  Features
                </a>
              </li>

              <li className="nav-item mx-1">
                <a className="nav-link text-center" href="/pricing">
                  Pricing
                </a>
              </li>

              <li className="nav-item mx-1">
                <a className="nav-link text-center" href="/contact">
                  Contact
                </a>
              </li>

              <li className="nav-item mx-1">
                <a className="nav-link text-center" href="/">
                  About
                </a>
              </li>

              <li className="nav-item mx-1">
                <a className="nav-link text-center" href="/login">
                  Login
                </a>
              </li>
            </ul>

            <a href="/register">
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Free Registeration
              </button>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeHeader;
