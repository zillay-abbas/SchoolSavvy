import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDashboard,
  loadNotice,
} from "../App/Redux/Action/dashboardActions";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Hamburger from "./Hamburger/Hamburger";
import UserSidebar from "./Sidebar/Sidebar";
import PathHeading from "./PathHeading/PathHeading";
import Home from "./Home/Home";

import SchoolComp from "./SchoolComp/SchoolComp";
import TeacherComp from "./TeacherComp/TeacherComp";
import ClassComp from "./ClassComp/ClassComp";
import ExamsComp from "./ExamsComp/ExamsComp";
import Parent from "./ParentComp/Parent";

import * as role from "../App/Redux/Constant/userConstant";

import StudentComp from "./StudentComp/StudentComp";
import Attendence from "./AttendenceComp/Attendence";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";

import "./UserDashboard.css";
import { logout } from "../App/Redux/Action/userActions";

export const UserDashboard = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { token, detail } = useSelector((state) => state.user);
  const { notice } = useSelector((state) => state.dashboard);

  const [isOpen, setOpen] = useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(loadDashboard(token));

    switch (detail.role) {
      case role.ADMIN:
        history("home");
        break;
      case role.STUDENT:
        history("class");
        break;
      case role.PARENT:
        history("student");
        break;
      case role.TEACHER:
        history("teacher");
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="dash-cont background-blue">
      <header className="head-cont">
        <div className="top-left-head">
          <div className="left-header">
            <Link to="/" className="b-brand">
              <span className="logo">SchoolSavvy</span>
            </Link>

            <a href="#!" className="mob-toggler" onClick={onToggle}>
              <Hamburger
                className="hamburger-react"
                toggled={isOpen}
                toggle={setOpen}
              />
            </a>

            <div className="right_head_popup">
              <MoreVertIcon />
            </div>
          </div>

          <div className="right-header">
            {detail.role !== role?.ADMIN && (
              <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                overlay={
                  <Popover id={`popover-positioned-bottom`}>
                    <Popover.Header as="h3">Notice</Popover.Header>
                    <Popover.Body>
                      {notice?.map((item) => (
                        <div key={item?.id}>
                          <strong>{item?.heading}</strong> {item?.description} <br />
                        </div>
                      ))}
                    </Popover.Body>
                  </Popover>
                }
              >
                <NotificationsNoneOutlinedIcon className="notify-ico" />
              </OverlayTrigger>
            )}

            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`}>
                  <Popover.Header as="h3">Account Detail</Popover.Header>
                  <Popover.Body>
                    <strong>Name: </strong> {detail?.name} <br />
                    <strong>Email:</strong> {detail?.email} <br />
                    <strong>Role:</strong>
                    {"   "}
                    {detail?.role === role?.ADMIN
                      ? "Admin"
                      : detail?.role === role?.PARENT
                      ? "Parent"
                      : detail?.role === role?.STUDENT
                      ? "Student"
                      : "Teacher"}{" "}
                    <br />
                    {/* <Button
                      type="submit"
                      variant="secondary"
                      className="a_LinkHeight"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </Button> */}
                  </Popover.Body>
                </Popover>
              }
            >
              <PersonOutlineOutlinedIcon className="person-ico" />
            </OverlayTrigger>
          </div>
        </div>
      </header>

      <div className="body-div">
        <UserSidebar is_Open={isOpen} on_Toggle={onToggle} />

        <div className="dash-info">
          {/* Heading */}
          <PathHeading />
          <Routes>
            {detail.role === role.ADMIN && (
              <Route path="/home" element={<Home />} />
            )}
            {detail.role === role.ADMIN && (
              <Route path="/school/*" element={<SchoolComp />} />
            )}
            {(detail.role === role.ADMIN ||
              detail.role === role.PARENT ||
              detail.role === role.TEACHER) && (
              <Route path="/student/*" element={<StudentComp />} />
            )}
            {detail.role === role.ADMIN && (
              <Route path="/parent/*" element={<Parent />} />
            )}
            {(detail.role === role.ADMIN || detail.role === role.TEACHER) && (
              <Route path="/teacher/*" element={<TeacherComp />} />
            )}
            <Route path="/class/*" element={<ClassComp />} />
            <Route path="/exam/*" element={<ExamsComp />} />
            <Route path="/attendance/*" element={<Attendence />} />
            {/* <Route path="/timetable/*" element={<Routine />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};
