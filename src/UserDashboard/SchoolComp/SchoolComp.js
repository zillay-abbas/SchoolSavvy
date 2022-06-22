import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddSchool from "./AddSchool/AddSchool";
import ViewSchool from "./ViewSchool/ViewSchool";
import SchoolPlan from "./SchoolPlan/SchoolPlan";

import "./SchoolComp.css";

const SchoolComp = () => {
  let history = useNavigate();

  useEffect(() => {
    history("view");
  }, []);

  return (
    <div className="school_cont h-100">
      <Card className="h-100">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="view" className="nav-link">
                Your Schools
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Add New School
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="plan" className="nav-link">
                Upgrade School Plan
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/view" element={<ViewSchool />} />
            <Route path="/add" element={<AddSchool />} />
            <Route path="/plan" element={<SchoolPlan />} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SchoolComp;
