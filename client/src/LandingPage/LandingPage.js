import React from "react";

import HomeFooter from "./Footer/HomeFooter";
import HomeHeader from "./Header/HomeHeader";
import Detail from "./Detail/Detail";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      {/* Header  */}
      <HomeHeader />

      {/* Front Page */}
      <div className="homecolor">
        <div className="container-fluid px-8 py-5">
          <div className="row py-5">

            <div className="col-md-6 col-12 order-md-first order-last">
              <main role="main" className="inner col-md main-f cover my-auto">
                <h1 className="cover-heading in-h1 text-white">
                  School <br /> Management <br /> Software
                </h1>
                <p className="lead my-4 text-white">
                  School Software to manage your school as you want, starting
                  from admissions to attendance and exams to result cards.
                </p>
                <p className="lead">
                  <a href="/register" className="btn btn-lg btn-primary">
                    Sign Up
                  </a>
                </p>
              </main>
            </div>
            
            <div className="col-md-6 col-12 order-md-last order-first">
              <main role="main" className="inner col-md cover p-3">
                <img
                  src="land-pg-home.jpg"
                  className="img-fluid imgBanner"
                  alt="Online Schooling System"
                />
              </main>
            </div>

          </div>
        </div>
      </div>

      <Detail />

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default LandingPage;
