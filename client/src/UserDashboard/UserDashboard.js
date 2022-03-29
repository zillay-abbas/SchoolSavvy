import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { useDispatch, useSelector } from "react-redux";
import { loadDashboard } from "../App/Redux/Action/dashboardActions";
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Hamburger from "./Hamburger/Hamburger";
import UserSidebar from "./Sidebar/Sidebar";
import PathHeading from "./PathHeading/PathHeading";

import Home from "./Home/Home";

import SchoolComp from "./SchoolComp/SchoolComp";
<<<<<<< HEAD
import TeacherComp from "./TeacherComp/TeacherComp"
import StudentComp from "./StudentComp/StudentComp";
import ClassComp from "./ClassComp/ClassComp";
import ExamsComp from "./Exams/ExamsComp";
=======
import TeacherComp from './TeacherComp/TeacherComp';
import ClassComp from "./ClassComp/ClassComp";
import ExamsComp from "./ExamsComp/ExamsComp";

import StudentComp from "./StudentComp/StudentComp";
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
import "./UserDashboard.css";

export const UserDashboard = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [isOpen, setOpen] = useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
<<<<<<< HEAD
=======
    console.log("dashh rend");
    dispatch(loadDashboard(token));
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
    history("home");
  }, []);

  return (
    <div className="dash-cont background-blue">
      <header className="head-cont">
        <div className="top-left-head">
          <div className="left-header">
            <a href="/" className="b-brand">
              <span className="logo">SchoolSavvy</span>
            </a>

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
            <NotificationsNoneOutlinedIcon className="notify-ico" />
            <PersonOutlineOutlinedIcon className="person-ico" />
          </div>
        </div>
      </header>

      <div className="body-div">
        <UserSidebar is_Open={isOpen} on_Toggle={onToggle} />

        <div className="dash-info">
          {/* Heading */}
          <PathHeading />

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/school/*" element={<SchoolComp />} />
            <Route path="/student/*" element={<StudentComp />} />
            <Route path="/parent/*" element={<></>} />
            <Route path="/teacher/*" element={<TeacherComp />} />
            <Route path="/class/*" element={<ClassComp />} />
<<<<<<< HEAD
            <Route path="/exam/*" element={<ExamsComp/>} />
=======
            <Route path="/exam/*" element={<ExamsComp />} />
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
            <Route path="/attendance/*" element={<></>} />
            <Route path="/timetable/*" element={<></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
