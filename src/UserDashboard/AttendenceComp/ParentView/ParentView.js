import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Table,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadParentAttendance } from "../../../App/Redux/Action/attendanceAction";
import moment from "moment";

const ParentView = () => {
  const dispatch = useDispatch();
  const { all: attendanceRecord } = useSelector((state) => state.attendance);
  const { all: stdArray } = useSelector((state) => state.student);

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

    attendanceRecord?.forEach((std) => {
      let student = std;
      student = {
        ...student,
        attendance: std?.attendance?.filter((record) => {
          let stdDate = moment(record?.date).format("DD-MM-YYYY");
          if (selectedDate === stdDate) {
            return record;
          }
        }),
      };
      arr.push(student);
    });

    setStdAttend(arr);
  };

  useEffect(() => {
    dispatch(loadParentAttendance(stdArray));

    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setStdAttend(arr);
  }, []);

  return (
    <>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>Search by date</Form.Label>
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
          <Button
            className=""
            disabled={date === "" ? true : false}
            variant="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Form.Group>

      <label className="table-lable">Detail </label>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Day</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {stdAttend?.map((attend) => {
            return attend?.attendance?.map((rec) =>
              rec?.school_attendence?.map((student) => (
                <tr>
                  <td>{attend?.user?.user_name}</td>
                  <td>{moment(rec?.date).format("dddd")}</td>
                  <td>{moment(rec?.date).format("DD-MM-YYYY")}</td>
                  <td>{student?.att_remarks}</td>
                </tr>
              ))
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ParentView;
