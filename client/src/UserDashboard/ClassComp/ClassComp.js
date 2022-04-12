import React, { useEffect, useState } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddClass from "./AddClass/AddClass";
import AllClassSchedule from "./AllClassSchedule/AllClassSchedule";
import ClassAssignment from "./ClassAssignment/ClassAssignment";
import ClassSchedule from "./ClassSchedule/ClassSchedule";
import Subject from "./Subject/Subject";

import { useDispatch } from "react-redux";
import { loadSchoolClasses } from "../../App/Redux/Action/classActions";
// import "./ClassComp.css";

const ClassComp = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadSchoolClasses());
    history("add");
  }, []);

  return (
    <div className="Class_cont h-100">
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/add">
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Class Details
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="allClassSchedule" className="nav-link">
                Class Schedule
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="subject" className="nav-link">
                Create Subject
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="assignment" className="nav-link">
                Class Assigment
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/add" element={<AddClass />} />
            <Route path="/allClassSchedule" element={<AllClassSchedule />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/assignment" element={<ClassAssignment />} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClassComp;
