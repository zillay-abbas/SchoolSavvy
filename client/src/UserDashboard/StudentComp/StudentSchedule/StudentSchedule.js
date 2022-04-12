import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadClassTimeTable } from "../../../App/Redux/Action/classActions";

import "./StudentSchedule.css";

const StudentSchedule = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.student);
  const { routine } = useSelector((state) => state.class);

  useEffect(() => {
    dispatch(
      loadClassTimeTable(current?.school_student?.class_section?.section_id)
    );
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
          {routine?.map((timeSlot) => (
            <tr>
              <th scope="row">{timeSlot.tt_day}</th>
              <td>{}</td>
              <td>Programming Fundamental</td>
              <td>9:50 to 10:50</td>
              <td>
                <Button type="submit" className="a_LinkHeight">
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
