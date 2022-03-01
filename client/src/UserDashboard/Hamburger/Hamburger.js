import React from "react";

import "./Hamburger.css";

const Hamburger = ({ toggled, isToggle }) => {
  const toggle = () => {
    isToggle(!toggled);
  };
  return (
    <div onClick={toggle}>
      <div className="cont-ham" role="button" tabindex="0">
        <div className="ham-bar ham-first-bar"></div>
        <div className="ham-bar ham-sec-bar"></div>
        <div className="ham-bar ham-third-bar"></div>
      </div>

      <style jsx>{`
        .ham-first-bar {
          top: 13px;
          transform: ${toggled
            ? "rotate(45deg)"
            : "none"};
        }

        .ham-sec-bar {
          top: 23px;
          opacity: ${toggled ? "0" : "1"};
        }

        .ham-third-bar {
          top: 33px;
          transform: ${toggled
            ? "rotate(-45deg) "
            : "none"};
        }
      `}</style>
    </div>
  );
};

export default Hamburger;
