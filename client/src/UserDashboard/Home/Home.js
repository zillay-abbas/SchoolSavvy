import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import BarChart from "../Chart/BarChart";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import Calendar from "../EventCalendar/EventCalendar";

import { loadDashboard } from "../../App/Redux/Action/dashboardActions";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("home rend");
    dispatch(loadDashboard(token));
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
