import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import MarkAttend from "./MarkAttend/Markattend.js";
import Record from "./Record/Record";
import AdminView from "./Record/AdminView";
import StudentView from "./StudentView/StudentView";
import * as role from "../../App/Redux/Constant/userConstant";
import { loadTeacherClasses } from "../../App/Redux/Action/classActions.js";
import { loadTeacherAttendance } from "../../App/Redux/Action/attendanceAction.js";
import ParentView from "./ParentView/ParentView.js";

const Attendence = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.user);

  useEffect(() => {
    if (detail.role === role.TEACHER) {
      dispatch(loadTeacherClasses());
      dispatch(loadTeacherAttendance());
      history("mark");
    }
    if (detail.role === role.ADMIN) {
      history("record");
    }
    if (detail.role === role.PARENT) {
      history("parentView");
    }
    if (detail.role === role.STUDENT) {
      history("view");
    }
  }, []);

  return (
    <div className="school_cont">
      <Card>
        <Card.Header>
          <Nav
            variant="tabs"
            defaultActiveKey={
              detail.role === role.TEACHER
                ? "/mark"
                : detail.role === role.ADMIN
                ? "/record"
                : detail.role === role.PARENT
                ? "/parentView"
                : "/view"
            }
          >
            {detail.role === role.TEACHER && (
              <Nav.Item>
                <NavLink to="mark" className="nav-link">
                  Class Attendence
                </NavLink>
              </Nav.Item>
            )}
            {(detail.role === role.ADMIN || detail.role === role.TEACHER) && (
              <Nav.Item>
                <NavLink to="record" className="nav-link">
                  Attendence Record
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.STUDENT && (
              <Nav.Item>
                <NavLink to="view" className="nav-link">
                  Record
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.PARENT && (
              <Nav.Item>
                <NavLink to="parentView" className="nav-link">
                  Record
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            {detail.role === role.TEACHER && (
              <Route path="/mark" element={<MarkAttend />} />
            )}
            {detail.role === role.TEACHER && (
              <Route path="/record" element={<Record />} />
            )}

            {detail.role === role.ADMIN && (
              <Route path="/record" element={<AdminView />} />
            )}
            {detail.role === role.STUDENT && (
              <Route path="/view" element={<StudentView />} />
            )}

            {detail.role === role.PARENT && (
              <Route path="/parentView" element={<ParentView />} />
            )}
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Attendence;
