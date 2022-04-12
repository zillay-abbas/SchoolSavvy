import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddTeacher from "./AddTeacher/AddTeacher"
import ViewTeacher from "./ViewTeacher/ViewTeacher";
import TeacherSchedule from "./TeacherSchedule/TeacherSchedule";
import TeacherAssignment from "./TeacherAssignment/TeacherAssignment"
import PostAssignment from "./PostAssignment/PostAssignment";


import "./TeacherComp.css";
import { useDispatch } from "react-redux";
import { loadTeachers } from "../../App/Redux/Action/teacherActions";

const TeacherComp = () => {
  let history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {  
    history('add');
    dispatch(loadTeachers());
  }, []);
  
  return (
    <div className="teacher_cont">
      <Card >
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/add">
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
