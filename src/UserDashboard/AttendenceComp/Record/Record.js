import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  Form,
  Row,
  Col,
  Dropdown,
  Table,
  InputGroup,
  ButtonGroup,
  DropdownButton,
  Modal,
  Accordion,
} from "react-bootstrap";
import ShowToast from "../../../App/Toast";
import * as role from "../../../App/Redux/Constant/userConstant";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import "./Record.css";

function Record() {
  const dispatch = useDispatch();
  const { all: classes } = useSelector((state) => state.class);
  const { detail } = useSelector((state) => state.user);
  const { all: attendanceRecord } = useSelector((state) => state.attendance);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");

  const [students, setstudents] = useState([]);

  const resetSearch = () => {
    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setstudents(arr);
    setGrade("");
    setSection("");
    setDate("");
  };

  const handleSearch = () => {
    if (grade === "" || section === "" || date === "") {
    } else {
      let arr = [];
      const selectedDate = moment(date).format('DD-MM-YYYY');

      attendanceRecord?.forEach((student) => {
        let stdDate = moment(student?.date).format('DD-MM-YYYY');
        if (
          student?.school_class_room?.class_id === grade?.class_id &&
          student?.class_section?.section_id === section?.section_id && 
          selectedDate === stdDate
        ) {
          arr.push(student);
        }
      });

      setstudents(arr);
    }
  };

  useEffect(() => {
    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setstudents(arr);
  }, []);

  return (
    <>
      <Form.Label>Select Class/Section</Form.Label>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <InputGroup className="mb-3" hasValidation>
          <DropdownButton
            variant="outline-secondary"
            title={grade?.cl_name ? grade?.cl_name : "Class"}
            id="input-group-dropdown-1"
          >
            {classes.map((grade) => {
              return (
                <Dropdown.Item
                  eventKey={grade}
                  onClick={() => {
                    setGrade(grade);
                  }}
                >
                  {grade?.cl_name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>

          <DropdownButton
            variant="outline-secondary"
            title={section?.section_name ? section?.section_name : "Section"}
            id="input-group-dropdown-1"
          >
            {grade?.class_section?.map((section) => {
              return (
                <Dropdown.Item
                  eventKey={section}
                  onClick={() => {
                    setSection(section);
                  }}
                >
                  {section.section_name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </InputGroup>

        <InputGroup className="mb-3" hasValidation>
          <Form.Control
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            placeholder="Date"
          />
        </InputGroup>

        <div className="btn_right">
          <Button className="btn_space" variant="primary" onClick={resetSearch}>
            View All
          </Button>
          <Button className="" variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Form.Group>

      <div className="assignment_table mt-4">
        <label className="table-lable">Attendence Detail</label>
        <Table class="table mt-6 border:1" bordered hover>
          <thead>
            <tr>
              <th scope="col">Reg. No</th>
              <th scope="col">Student Name</th>
              <th scope="col">Date</th>
              <th scope="col">Remarks</th>
              {detail.role === role.ADMIN && <th scope="col">Update</th>}
            </tr>
          </thead>
          <tbody>
            {students?.map((attend) => {
              return attend?.school_attendence?.map((student) => (
                <tr>
                  <td>{student?.school_student?.student_reg_no}</td>
                  <td>{student?.school_student?.user?.user_name}</td>
                  <td>{moment(attend?.date).format("DD-MM-YYYY")}</td>
                  <td>{student?.att_remarks}</td>
                  {detail.role === role.ADMIN && (
                    <td>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {}}
                      >
                        Edit
                      </Button>
                    </td>
                  )}
                </tr>
              ));
            })}
          </tbody>
        </Table>
      </div>

      {/* <ShowToast show={isDialog} msg={msg} from={"class"} /> */}
    </>
  );
}

export default Record;
