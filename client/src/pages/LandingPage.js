import React from "react";
import HomeFooter from "../components/HomePage/HomeFooter.js";
import HomeHeader from "../components/HomePage/HomeHeader.js";
import "./LandingPage.css";
import Detail from '../components/HomePage/Detail';

const LandingPage = () => {
  return (
    <div>
      {/* Header  */}
      <HomeHeader />

      {/* Front Page */}
      <div className="homecolor">
        <div className="container-fluid px-8 py-3">
          <div className="row py-5">
            <main role="main" class="inner col-md main-f cover my-auto">
              <h1 class="cover-heading in-h1 text-white">
                School <br /> Management <br /> Software
              </h1>
              <p class="lead my-4 text-white">
                School Software to manage your school as you want, starting from
                admissions to attendance and exams to result cards.
              </p>
              <p class="lead">
                <a href="/register" class="btn btn-lg btn-primary">
                  Sign Up
                </a>
              </p>
            </main>
            <main role="main" class="inner col-md cover p-3">
              <img
                src="land-pg-home.jpg"
                className="img-fluid imgBanner"
                alt="Online Schooling System"
              />
            </main>
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
