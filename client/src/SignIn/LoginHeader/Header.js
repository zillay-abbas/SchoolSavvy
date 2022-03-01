import React from "react";

import "./Header.css";

const HomeHeader = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container justify-content-center">
          <a className="navbar-brand header_name" href="/">
            SchoolSavvy
          </a>
        </div>
      </nav>
    </div>
  );
};

export default HomeHeader;
