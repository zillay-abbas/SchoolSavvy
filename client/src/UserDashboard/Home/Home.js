<<<<<<< HEAD
import React from "react";
=======
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

import Card from "../Card/Card";
import BarChart from "../Chart/BarChart";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import Calendar from "../EventCalendar/EventCalendar";

<<<<<<< HEAD
import "./Home.css";

const home = () => {
=======
import { loadDashboard } from "../../App/Redux/Action/dashboardActions";

import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("home rend");
    dispatch(loadDashboard(token));
  }, []);

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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

export default home;
