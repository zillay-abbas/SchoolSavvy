import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

<<<<<<< HEAD
import AddSchool from './AddScool/AddSchool';
=======
import AddSchool from "./AddScool/AddSchool";
import ViewSchool from "./ViewSchool/ViewSchool";
import SchoolPlan from "./SchoolPlan/SchoolPlan";

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
              <NavLink to="remove" className="nav-link">
                Remove School
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/view" element={<>view</>} />
            <Route path="/add" element={<AddSchool />} />
<<<<<<< HEAD
            <Route path="/remove" element={<>remove</>} />
=======
            <Route path="/plan" element={<SchoolPlan />} />
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SchoolComp;
