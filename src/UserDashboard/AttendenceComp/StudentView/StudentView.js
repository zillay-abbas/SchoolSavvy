import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Table, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadStudentAttendance } from "../../../App/Redux/Action/attendanceAction";
import moment from "moment";

const StudentView = () => {
  const dispatch = useDispatch();
  const { all: attendanceRecord } = useSelector((state) => state.attendance);

  const [date, setDate] = useState("");

  const [stdAttend, setStdAttend] = useState([]);

  const resetSearch = () => {
    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setStdAttend(arr);
    setDate("");
  };

  const handleSearch = () => {
    let arr = [];

    const selectedDate = moment(date).format("DD-MM-YYYY");

    attendanceRecord?.forEach((record) => {
      let stdDate = moment(record?.date).format("DD-MM-YYYY");

      if (selectedDate === stdDate) {
        arr.push(record);
      }
    });

    setStdAttend(arr);
  };

  useEffect(() => {
    dispatch(loadStudentAttendance());

    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setStdAttend(arr);

  }, []);

  return (
    <>
      <Form.Label>Search by date</Form.Label>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <InputGroup className="mb-3" hasValidation>
          <Form.Control
            type="date"
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            value={date}
          />
        </InputGroup>

        <div className="btn_right">
          <Button className="btn_space" variant="primary" onClick={resetSearch}>
            View All
          </Button>
          <Button className="" disabled={date === "" ? true : false} variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Form.Group>

      <label className="table-lable">Detail </label>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {stdAttend?.map((attend) => {
              return attend?.school_attendence?.map((student) => (
                <tr>
                  <td>{moment(attend?.date).format("dddd")}</td>
                  <td>{moment(attend?.date).format("DD-MM-YYYY")}</td>
                  <td>{student?.att_remarks}</td>
                </tr>
              ));
            })}
        </tbody>
      </Table>
    </>
  );
};

export default StudentView;
