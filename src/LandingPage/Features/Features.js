import React from "react";
import "./Features.css";

import HomeFooter from "../Footer/HomeFooter";
import HomeHeader from "../Header/HomeHeader";

const Features = () => {
  return (
    <div>
      <HomeHeader />
      {/* Head */}

      <div>
        <h1 className="gg_h11"> School Savvy (Virtual Classes) </h1>
      </div>

      <div className="gg_box">
        <div>
          <p className="gg_pp">
            Fekara School Management System is offering Virutal Classroom
            (online Classes) integrated with Zoom in order to enhance the
            learning procedure for students. Admins or teachers can create
            online classes from within the app and Link for meeting are both
            updated into students and teachers panels.
          </p>
        </div>
        <div>
          <img src="edu.jpg" className="gg_img" alt="EDUCATION"/>
        </div>
      </div>
      <div>
        <div className="gg_Head22">
          <h3 className="gg_Head2">
            Student Management System Administer Your Institution Smoothly
          </h3>
          <p className="gg_pp2">
            Vast school software modules set gives you 360-degree student
            management system starting from admission to pass-out. feKara is a
            powerful and flexible student information system. As it is hosted in
            the cloud and always accessible.
          </p>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default Features;
