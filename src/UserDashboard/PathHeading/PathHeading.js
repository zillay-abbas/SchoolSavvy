import React from "react";
import { useSelector } from "react-redux";

import Breadcrumbs from "./BreadCrumbs/BreadCrumbs";

import "./PathHeading.css";

const PathHeading = () => {
  const { school } = useSelector((state) => state.dashboard);

  return (
    <div className="top-heading-school">
      <div className="sch-name">{ school ? school.name : "No School Exists"}</div>

      <div className="sch-det">{ school ? school.description : ""}</div>
      <Breadcrumbs />
    </div>
  );
};

export default PathHeading;
