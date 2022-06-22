import React from "react";

import "./Hamburger.css";

const Hamburger = ({ toggled }) => {
 
  return (
    <div >
      <div className="cont-ham" role="button" tabindex="0">
        <div className="ham-bar ham-first-bar"></div>
        <div className="ham-bar ham-sec-bar"></div>
        <div className="ham-bar ham-third-bar"></div>
      </div>

      <style jsx>{`
        .ham-first-bar {
          transform: ${toggled
            ? "rotate(45deg) translate(0px, 5px)"
            : "none"};
        }

        .ham-sec-bar {
          display: ${toggled ? "none" : "block"};
        }

        .cont-ham {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          height: ${toggled ? "9px" : "14px"};
          width: 20px;
          justify-content: space-between;
          align-items: center;
          transition: all 0.4s cubic-bezier(0, 0, 0, 1) 0s;
        }

        .ham-third-bar {
          transform: ${toggled
            ? "rotate(-45deg) translate(0px, -5px)"
            : "none"};
        }
      `}</style>

    </div>
  );
};

export default Hamburger;
