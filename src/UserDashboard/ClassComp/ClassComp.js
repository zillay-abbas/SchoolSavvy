import React, { useEffect, useState } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddClass from "./AddClass/AddClass";
import AllClassSchedule from "./AllClassSchedule/AllClassSchedule";
import ClassAssignment from "./TeacherView/ClassAssignment";
import StudentView from "./StudentView/StudentView";
import ClassSchedule from "./ClassSchedule/ClassSchedule";
import Subject from "./Subject/Subject";

import { useDispatch, useSelector } from "react-redux";
import {
  loadSchoolClasses,
  loadTeacherClasses,
} from "../../App/Redux/Action/classActions";
import * as role from "../../App/Redux/Constant/userConstant";
import StudentSchedule from "./StudentSchedule/StudentSchedule";
import { loadCurrentStudent } from "../../App/Redux/Action/studentActions";

const ClassComp = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.user);

  useEffect(() => {
    if (detail.role === role.ADMIN) {
      dispatch(loadSchoolClasses());
      history("add");
    }
    if (detail.role === role.TEACHER) {
      dispatch(loadTeacherClasses());
      history("assignment");
    }
    if (detail.role === role.STUDENT) {
      dispatch(loadCurrentStudent());
      history("student-schedule");
    }
  }, []);

  return (
    <div className="Class_cont">
      <Card>
        <Card.Header>
          <Nav
            variant="tabs"
            defaultActiveKey={
              detail.role === role.ADMIN
                ? "/add"
                : detail.role === role.TEACHER
                ? "/assignment"
                : detail.role === role.STUDENT
                ? "/student-schedule"
                : ""
            }
          >
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="add" className="nav-link">
                  Class Details
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="allClassSchedule" className="nav-link">
                  Class Schedule
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="subject" className="nav-link">
                  Create Subject
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.TEACHER && (
              <Nav.Item>
                <NavLink to="assignment" className="nav-link">
                  Class Assigment
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.STUDENT && (
              <>
                <Nav.Item>
                  <NavLink to="student-schedule" className="nav-link">
                    Class Schedule
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="studentview" className="nav-link">
                    Assignments
                  </NavLink>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            {detail.role === role.ADMIN && (
              <>
                <Route path="/add" element={<AddClass />} />
                <Route
                  path="/allClassSchedule"
                  element={<AllClassSchedule />}
                />
                <Route path="/subject" element={<Subject />} />
              </>
            )}
            {detail.role === role.TEACHER && (
              <Route path="/assignment" element={<ClassAssignment />} />
            )}
            {detail.role === role.STUDENT && (
              <>
                <Route path="/studentview" element={<StudentView />} />
                <Route path="/student-schedule" element={<StudentSchedule />} />
              </>
            )}
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ClassComp;
