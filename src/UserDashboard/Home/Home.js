import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import BarChart from "../Chart/BarChart";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import Calendar from "../EventCalendar/EventCalendar";

import { loadDashboard, loadNotice } from "../../App/Redux/Action/dashboardActions";

import "./Home.css";
import { loadSchoolStudents } from "../../App/Redux/Action/studentActions";
import { loadTeachers } from "../../App/Redux/Action/teacherActions";
import { loadSubjects } from "../../App/Redux/Action/subjectActions";
import { loadParents } from "../../App/Redux/Action/parentActions";
import { loadSchoolAttendance } from "../../App/Redux/Action/attendanceAction";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadDashboard(token));
    dispatch(loadSchoolStudents());
    dispatch(loadTeachers());
    dispatch(loadSubjects());
    dispatch(loadParents());
    dispatch(loadSchoolAttendance());
  }, []);

  return (
    <>
      {/* Cards */}
      <Card />

      <div className="sch_summary">
        {/* Charts */}
        <BarChart />

        <NoticeBoard />
      </div>
      <Calendar />
    </>
  );
};

export default Home;
