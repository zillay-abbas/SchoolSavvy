import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddTeacher from "./AddTeacher/AddTeacher";
import ViewTeacher from "./ViewTeacher/ViewTeacher";
import TeacherSchedule from "./TeacherSchedule/TeacherSchedule";
import TeacherAssignment from "./TeacherAssignment/TeacherAssignment";
import PostAssignment from "./PostAssignment/PostAssignment";

import { useDispatch, useSelector } from "react-redux";
import {
  loadCurrentTeacher,
  loadTeachers,
} from "../../App/Redux/Action/teacherActions";
import * as role from "../../App/Redux/Constant/userConstant";

import "./TeacherComp.css";

const TeacherComp = () => {
  let history = useNavigate();

  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.user);

  useEffect(() => {
    if (detail.role === role.TEACHER) {
      history("schedule");
      dispatch(loadCurrentTeacher());
    } else {
      dispatch(loadTeachers());
      history("add");
    }
  }, []);

  return (
    <div className="teacher_cont">
      <Card>
        <Card.Header>
          <Nav
            variant="tabs"
            defaultActiveKey={
              detail.role === role.ADMIN
                ? "/add"
                : detail.role === role.TEACHER
                ? "/schedule"
                : "/"
            }
          >
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="add" className="nav-link">
                  Add New Teacher
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="Search" className="nav-link">
                  Search Teacher
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.TEACHER && (
              <Nav.Item>
                <NavLink to="schedule" className="nav-link">
                  Schedule
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.TEACHER && (
            <Nav.Item>
              <NavLink to="classwork" className="nav-link">
                Classwork
              </NavLink>
            </Nav.Item>
            )}
            {/* <Nav.Item>
              <NavLink to="teacher-assignment" className="nav-link">
                Assignments
              </NavLink>
            </Nav.Item> */}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            {detail.role === role.ADMIN && (
              <Route path="/add" element={<AddTeacher />} />
            )}
            {detail.role === role.ADMIN && (
              <Route path="/search" element={<ViewTeacher />} />
            )}
            <Route path="/schedule" element={<TeacherSchedule />} />
            {/* <Route path="/teacher-assignment" element={<TeacherAssignment />} /> */}
            <Route path="/classwork" element={<PostAssignment />} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeacherComp;
