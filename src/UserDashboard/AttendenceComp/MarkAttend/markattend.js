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
  Badge,
} from "react-bootstrap";
import moment from "moment";
import ShowToast from "../../../App/Toast";

import { useDispatch, useSelector } from "react-redux";

import { submitAttendance } from "../../../App/Redux/Action/attendanceAction";

import "./markattend.css";

function MarkAttend() {
  const dispatch = useDispatch();
  const { all: classes } = useSelector((state) => state.class);
  const {
    all: records,
    isDialog,
    msg,
  } = useSelector((state) => state.attendance);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");

  const [attendanceErr, setAttendanceErr] = useState("");

  const [students, setstudents] = useState([]);
  const [isMarked, setIsMarked] = useState(false);

  const markAttendance = (e, student) => {
    setstudents(
      students.map((std) => {
        if (std?.id === student?.id) {
          return {
            ...std,
            remarks: e.target.value,
          };
        } else {
          return std;
        }
      })
    );
  };

  const handleAttendance = () => {
    if (moment().day() === 0 || moment().day() === 6) {
      setAttendanceErr("You can't mark attendance on Saturday and Sunday");
    } else {
      dispatch(submitAttendance(students, grade?.class_id, section?.section_id));
    }
  };

  useEffect(() => {
    let arr = [];

    section?.school_student?.forEach((student) => {
      let std = {
        id: student.student_id,
        reg: student.student_reg_no,
        name: student.user.user_name,
        remarks: null,
      };

      arr.push(std);
    });

    setstudents(arr);
  }, [section]);

  useEffect(() => {
    for (var i = 0; i < students.length; i++) {
      if (students[i].remarks === null) {
        setIsMarked(false);
        break;
      } else {
        setIsMarked(true);
      }
    }
  }, [students]);

  return (
    <>
      <div className="part_inline">
        <div className="inline_part">
          <Form.Label>Select Class/Section</Form.Label>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={grade.cl_name ? grade.cl_name : "Class"}
                id="input-group-dropdown-1"
              >
                {classes.map((grade) => {
                  return (
                    <Dropdown.Item
                      eventKey={grade.class_id}
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
                title={section.section_name ? section.section_name : "Section"}
                id="input-group-dropdown-1"
              >
                {grade?.class_section?.map((section) => {
                  return (
                    <Dropdown.Item
                      eventKey={section.section_id}
                      onClick={() => {
                        setSection(section);
                      }}
                    >
                      {section?.section_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </InputGroup>
          </Form.Group>
        </div>
        <div className="righ_date">
          <label className="table-lable">
            <Badge className="badge_ed" bg="secondary">
              <small> {moment(new Date()).format("MMMM Do YYYY")}</small>
            </Badge>{" "}
          </label>
        </div>
      </div>

      <div className="assignment_table mt-4">
        <label className="table-lable">Attendence Detail</label>
        <Table class="table mt-6 border:1" bordered hover>
          <thead>
            <tr>
              <th scope="col">Reg. No</th>
              <th scope="col">Student Name</th>
              <th scope="col">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <td>{student?.reg}</td>
                <td>{student?.name}</td>
                <td>
                  {student && (
                    <div key={`inline-radio`}>
                      <Form.Check
                        inline
                        label="Present"
                        value="Present"
                        name={student?.id}
                        type="radio"
                        checked={student?.remarks === "Present"}
                        onClick={(e) => markAttendance(e, student)}
                        id={student?.id}
                      />
                      <Form.Check
                        inline
                        label="Absent"
                        value="Absent"
                        name={student?.id}
                        checked={student?.remarks === "Absent"}
                        onClick={(e) => markAttendance(e, student)}
                        type="radio"
                        id={student?.reg}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="rig_align">
          <div
            className="invalid-feedback feed_active"
            style={{
              fontWeight: "",
              color: "#DC3545",
            }}
          >
            {attendanceErr}
          </div>
          <Button disabled={isMarked ? false : true} onClick={handleAttendance}>
            Submit Attendance
          </Button>
        </div>
      </div>

      <ShowToast show={isDialog} msg={msg} from={"attendance"} />
    </>
  );
}

export default MarkAttend;
