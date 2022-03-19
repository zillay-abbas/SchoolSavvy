import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import BarChart from "../Chart/BarChart";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import Calendar from "../EventCalendar/EventCalendar";

import { loadDashboard } from "../../App/Redux/actions/userAction";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("home rend");
    dispatch(loadDashboard());
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
