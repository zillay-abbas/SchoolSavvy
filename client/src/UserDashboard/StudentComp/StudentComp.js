import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddStudent from "./AddStudent/AddStudent"
import ViewStudent from "./ViewStudent/ViewStudent";
import StudentSchedule from "./StudentSchedule/StudentSchedule";
import StudentAttendance from "./StudentAttendance/StudentAttendance";
import StudentPostAssignment from "./StudentPostAssignment/StudentPostAssignment";
import StudentAssignment from "./StudentAssignment/StudentAssignment";

import "./StudentComp.css";

const StudentComp = () => {
  let history = useNavigate();

  useEffect(() => {  
    history('view');
  }, []);
  
  return (
    <div className="student_cont h-100">
      <Card className="h-100">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Add New Student
              </NavLink>      
            </Nav.Item>
            <Nav.Item>
              <NavLink to="Search" className="nav-link">
                Search Student
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="student-schedule" className="nav-link">
                 Schedule
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="attendance" className="nav-link">
                 Attendance
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="studentPostAssignment" className="nav-link">
                 Post Assignment
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="studentAssignment" className="nav-link">
              Assignment
              </NavLink>
            </Nav.Item>
           
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/add" element={<AddStudent />} />
            <Route path="/search" element={<ViewStudent/>} />
            <Route path="/student-schedule" element={<StudentSchedule/>} />
            <Route path="/attendance" element={<StudentAttendance/>} />
            <Route path="/studentPostAssignment" element={<StudentPostAssignment/>} />
            <Route path="/studentAssignment" element={<StudentAssignment/>} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentComp;
