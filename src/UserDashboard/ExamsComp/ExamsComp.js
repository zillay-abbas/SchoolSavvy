import React, { useEffect } from "react";
import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Exams from "./Exam/Exams";
import Schedule from "./Schedule/Schedule";
import TeacherView from "./TeacherView/TeacherView";
import StudentView from "./StudentView/StudentView";
import ParentView from "./ParentView/ParentView";
import * as role from "../../App/Redux/Constant/userConstant";

import "./ExamsComp.css";
import { useSelector } from "react-redux";
import Submission from "./Submission/Submission";
import AdminView from "./Submission/AdminView";

const ExamsComp = () => {
  const { detail } = useSelector((state) => state.user);

  let history = useNavigate();

  useEffect(() => {
    switch (detail.role) {
      case role.ADMIN:
        history("view");
        break;
      case role.TEACHER:
        history("teacher");
        break;
      case role.STUDENT:
        history("student");
        break;
      case role.PARENT:
        history("parent");
        break;
      default:
        break;
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
                ? "/view"
                : detail.role === role.TEACHER
                ? "/teacher"
                : detail.role === role.PARENT
                ? "/parent"
                : detail.role === role.STUDENT
                ? "/student"
                : ""
            }
          >
            {detail.role === role.ADMIN && (
              <>
                <Nav.Item>
                  <NavLink to="view" className="nav-link">
                    Exams
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="schedule" className="nav-link">
                    Schedule
                  </NavLink>
                </Nav.Item>
              </>
            )}
            {detail.role === role.TEACHER && (
              <Nav.Item>
                <NavLink to="teacher" className="nav-link">
                  Exams
                </NavLink>
              </Nav.Item>
            )}
            {(detail.role === role.TEACHER) && (
              <Nav.Item>
                <NavLink to="submission" className="nav-link">
                  Submission
                </NavLink>
              </Nav.Item>
            )}
            {(detail.role === role.ADMIN) && (
              <Nav.Item>
                <NavLink to="submission" className="nav-link">
                  Submission
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.STUDENT && (
              <Nav.Item>
                <NavLink to="student" className="nav-link">
                  Exams
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.PARENT && (
              <Nav.Item>
                <NavLink to="parent" className="nav-link">
                  Exam Results
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            {detail.role === role.ADMIN && (
              <>
                <Route path="/view" element={<Exams />} />
                <Route path="/schedule" element={<Schedule />} />
              </>
            )}
            {detail.role === role.TEACHER && (
              <Route path="/teacher" element={<TeacherView />} />
            )}
            {(detail.role === role.TEACHER) && (
              <Route path="/submission" element={<Submission />} />
            )}
             {(detail.role === role.ADMIN) && (
              <Route path="/submission" element={<AdminView />} />
            )}
            {detail.role === role.STUDENT && (
              <Route path="/student" element={<StudentView />} />
            )}

            {detail.role === role.PARENT && (
              <Route path="/parent" element={<ParentView />} />
            )}
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExamsComp;
