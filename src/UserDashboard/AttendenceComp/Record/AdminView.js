import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Col,
  Dropdown,
  Table,
  InputGroup,
  DropdownButton,
  Modal,
  Spinner,
} from "react-bootstrap";
import ShowToast from "../../../App/Toast";
import * as role from "../../../App/Redux/Constant/userConstant";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import {
  loadSchoolAttendance,
  updateAttendance,
} from "../../../App/Redux/Action/attendanceAction";

import "./Record.css";
import { loadSchoolClasses } from "../../../App/Redux/Action/classActions";

function Record() {
  const dispatch = useDispatch();
  const { all: classes } = useSelector((state) => state.class);
  const {
    all: attendanceRecord,
    loading,
    msg,
    isDialog,
  } = useSelector((state) => state.attendance);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");

  const [attRecord, setAttRecord] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
    if (grade !== "" || section !== "" || date !== "") {
      let arr = [];
      const selectedDate = moment(date).format("DD-MM-YYYY");

      attendanceRecord?.forEach((student) => {
        let stdDate = moment(student?.date).format("DD-MM-YYYY");
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

  const handleUpdate = () => {
    dispatch(updateAttendance(attRecord));
    setShowEdit(false);
    setAttRecord("");
  };

  useEffect(() => {
    dispatch(loadSchoolClasses());
    dispatch(loadSchoolAttendance());

    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setstudents(arr);
  }, []);

  useEffect(() => {
    let arr = [];

    attendanceRecord?.forEach((student) => {
      arr.push(student);
    });

    setstudents(arr);
  }, [attendanceRecord]);

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
            placeholder="Date"
            value={date}
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
              <th scope="col">Class</th>
              <th scope="col">Date</th>
              <th scope="col">Remarks</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((attend) => {
              return attend?.school_attendence?.map((student) => (
                <tr>
                  <td>{student?.school_student?.student_reg_no}</td>
                  <td>{student?.school_student?.user?.user_name}</td>
                  <td>
                    {attend?.school_class_room?.cl_name +
                      " (" +
                      attend?.class_section?.section_name +
                      ")"}
                  </td>
                  <td>{moment(attend?.date).format("DD-MM-YYYY")}</td>
                  <td>{student?.att_remarks}</td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => {
                        setShowEdit(true);
                        setAttRecord(student);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </Table>
      </div>

      {/* Allot Marks */}
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setAttRecord("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Attendance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="username">
            <h6>Select Remarks</h6>
          </label>{" "}
          <DropdownButton
            variant="outline-secondary"
            title={attRecord?.att_remarks ? attRecord?.att_remarks : "Choose"}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item
              eventKey={grade}
              onClick={() => {
                setAttRecord({ ...attRecord, att_remarks: "Present" });
              }}
            >
              Present
            </Dropdown.Item>
            <Dropdown.Item
              eventKey={grade}
              onClick={() => {
                setAttRecord({ ...attRecord, att_remarks: "Absent" });
              }}
            >
              Absent
            </Dropdown.Item>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &#160; Loading...
              </>
            ) : (
              <>Update</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"attendance"} />
    </>
  );
}

export default Record;
