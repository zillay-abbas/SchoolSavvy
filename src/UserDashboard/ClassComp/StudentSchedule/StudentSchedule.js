import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadStudentClassTimeTable } from "../../../App/Redux/Action/classActions";
import { loadNotice } from "../../../App/Redux/Action/dashboardActions";
import moment from "moment";

import "./StudentSchedule.css";

const StudentSchedule = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.student);
  const { schedule } = useSelector((state) => state.class);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    dispatch(
      loadStudentClassTimeTable(
        current?.school_student?.class_section?.section_id
      )
    );
    dispatch(loadNotice());
  }, []);

  return (
    <div className="container">
      <Table class="table mt-6 border:1" bordered hover>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Teacher Name</th>
            <th scope="col">Subject</th>
            <th scope="col">Class Time</th>
            <th scope="col">Classroom Link</th>
          </tr>
        </thead>
        <tbody>
          {schedule?.map((timeSlot) => (
            <tr>
              <th scope="row">{timeSlot?.tt_day}</th>
              <td>{timeSlot?.user?.user_name}</td>
              <td>{timeSlot?.school_course?.course_name}</td>
              <td>
                {moment.utc(timeSlot?.tt_time_start).format("hh:mm a") +
                  " - " +
                  moment.utc(timeSlot?.tt_time_end).format("hh:mm a")}
              </td>
              <td>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  disabled={timeSlot?.tt_class_link ? false : true}
                  onClick={() => {
                    openInNewTab(timeSlot?.tt_class_link);
                  }}
                >
                  Join Class
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentSchedule;
