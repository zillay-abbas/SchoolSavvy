import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddTeacher from "./AddTeacher/AddTeacher"
import ViewTeacher from "./ViewTeacher/ViewTeacher";
import TeacherSchedule from "./TeacherSchedule/TeacherSchedule";
import TeacherAssignment from "./TeacherAssignment/TeacherAssignment"
import PostAssignment from "./PostAssignment/PostAssignment";


import "./TeacherComp.css";

const TeacherComp = () => {
  let history = useNavigate();

  useEffect(() => {  
    history('view');
  }, []);
  
  return (
    <div className="teacher_cont h-100">
      <Card className="h-100">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Add New Teacher
              </NavLink>      
            </Nav.Item>
            <Nav.Item>
              <NavLink to="Search" className="nav-link">
                Search Teacher
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="teacher-schedule" className="nav-link">
                 Schedule
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="Post-assignment" className="nav-link">
                Post Assignment
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="teacher-assignment" className="nav-link">
                 Assignments
              </NavLink>
            </Nav.Item>
           
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/add" element={<AddTeacher />} />
            <Route path="/search" element={<ViewTeacher/>} />
            <Route path="/teacher-schedule" element={<TeacherSchedule/>} />
            <Route path="/teacher-assignment" element={<TeacherAssignment/>} />
            <Route path="/Post-assignment" element={<PostAssignment/>} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherComp;
