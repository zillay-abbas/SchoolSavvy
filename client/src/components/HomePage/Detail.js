import React from "react";
import "./Detail.css";

const Section2 = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="line text-center">
            Why school savvy Schooling managemnet Software?
          </h2>
        </div>
      </div>
      <div className="row ptb20">
        <div className="col-md-6">
          <div className="paraDiv d-flex justify-content-center align-items-center flex-column  order-md-first order-last">
            <p>
              School Savvy is a multipurpose school management system which aids
              in automating the school’s daily operations hassle-free and
              provide insightful reports and 360-degree tracking so that the
              stakeholders can make better and faster decisions to escalate the
              productivity of their institution.
            </p>
            <p>
              From organizing the parent-teacher meeting to online fees
              collection and examination management, to bulk data management
              school Savvy software handles every process smoothly and
              efficiently. It is a fully web-based school ERP software provides
              100+ excellent modules, 24/7 customer support, and data security.
            </p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center  order-md-last order-first">
          <img
            src="guide-img.svg"
            alt="Online Schooling System"
            className="img-fluid bannerImg mb-md-0 mb-5"
          />
        </div>
      </div>
    </section>
  );
};

export default Section2;
