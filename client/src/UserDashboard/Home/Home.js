import React from "react";

import Card from "../Card/Card";
import BarChart from "../Chart/BarChart";
import NoticeBoard from "../NoticeBoard/NoticeBoard";
import Calendar from "../EventCalendar/EventCalendar";

import "./Home.css";

const home = () => {
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
