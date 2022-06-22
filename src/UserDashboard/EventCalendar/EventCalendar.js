import React from "react";

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";

import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 

import "./EventCalendar.css";

// const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  return (
    <div className="event_cal">
      <div className="cal_head">
        <h5 className="h5_no_m">Event List</h5>
      </div>
      <div className="p_20">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
    </div>
  );
};

export default EventCalendar;
