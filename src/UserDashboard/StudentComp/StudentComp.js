import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddStudent from "./AddStudent/AddStudent";
import ViewStudent from "./ViewStudent/ViewStudent";

import ParentView from "./ParentView/ParentView";
import { useDispatch, useSelector } from "react-redux";
import * as role from "../../App/Redux/Constant/userConstant";

import { loadCurrentStudent } from "../../App/Redux/Action/studentActions";

import "./StudentComp.css";

const StudentComp = () => {
  let history = useNavigate();

  const { detail } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (detail.role === role.STUDENT) {
      dispatch(loadCurrentStudent());
      history("student-schedule");
    }
    if (detail.role === role.ADMIN) {
      history("add");
    }
    if (detail.role === role.PARENT) {
      history("parentView");
    }
  }, []);

  return (
    <div className="student_cont">
      <Card>
        <Card.Header>
          <Nav
            variant="tabs"
            defaultActiveKey={
              detail.role === role.ADMIN
                ? "/add"
                : detail.role === role.PARENT
                ? "/parentView"
                : "/add"
            }
          >
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="add" className="nav-link">
                  Add New Student
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.ADMIN && (
              <Nav.Item>
                <NavLink to="search" className="nav-link">
                  Search Student
                </NavLink>
              </Nav.Item>
            )}
            {detail.role === role.PARENT && (
              <Nav.Item>
                <NavLink to="parentView" className="nav-link">
                  Student
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            {detail.role === role.ADMIN && (
              <>
                <Route path="/add" element={<AddStudent />} />
                <Route path="/search" element={<ViewStudent />} />
              </>
            )}
            {detail.role === role.PARENT && (
              <Route path="/parentView" element={<ParentView />} />
            )}
            {/* <Route path="/attendance" element={<StudentAttendance />} /> */}
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentComp;
