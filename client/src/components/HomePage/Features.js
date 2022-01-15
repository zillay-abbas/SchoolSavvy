import React from "react";
import "./Features.css";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";

const Features = () => {
  return (
    <div>
      <HomeHeader />
      {/* Head */}

      <div>
        <h1 className="h11"> School Savvy (Virtual Classes) </h1>
      </div>

      <div className="box">
        <div>
          <p className="pp">
            Fekara School Management System is offering Virutal Classroom
            (online Classes) integrated with Zoom in order to enhance the
            learning procedure for students. Admins or teachers can create
            online classes from within the app and Link for meeting are both
            updated into students and teachers panels.
          </p>
        </div>
        <div>
          <img src="edu.jpg" className="img" alt="EDUCATION"/>
        </div>
      </div>
      <div>
        <div className="Head22">
          <h3 className="Head2">
            Student Management System Administer Your Institution Smoothly
          </h3>
          <p className="pp2">
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
