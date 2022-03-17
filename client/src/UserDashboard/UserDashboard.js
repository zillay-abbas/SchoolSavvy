import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Hamburger from "./Hamburger/Hamburger";
import UserSidebar from "./Sidebar/Sidebar";
import PathHeading from "./PathHeading/PathHeading";
import Home from "./Home/Home";

import SchoolComp from "./SchoolComp/SchoolComp";

import "./UserDashboard.css";

export const UserDashboard = () => {
  let history = useNavigate();

  const [isOpen, setOpen] = useState(true);

  const onToggle = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
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
            <Route path="/student/*" element={<></>} />
            <Route path="/parent/*" element={<></>} />
            <Route path="/teacher/*" element={<></>} />
            <Route path="/class/*" element={<></>} />
            <Route path="/exam/*" element={<></>} />
            <Route path="/attendance/*" element={<></>} />
            <Route path="/timetable/*" element={<></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
