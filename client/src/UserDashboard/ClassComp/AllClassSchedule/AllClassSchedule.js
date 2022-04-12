import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  InputGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";

import ShowToast from "../../../App/Toast";

import { useDispatch, useSelector } from "react-redux";

import {
  addClassTimeTable,
  loadClassSchedule,
} from "../../../App/Redux/Action/classActions";

import "./AllClassSchedule.css";

function AllClassSchedule() {

  const { all, routine, loading, msg, isDialog } = useSelector((state) => state.class);
  const { all: teachers } = useSelector((state) => state.teacher);
  const { all: subjects } = useSelector((state) => state.subject);

  const dispatch = useDispatch();

  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [classErr, setClassErr] = useState("");
  const [teacherErr, setTeacherErr] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    if (section !== "" && selectedClass !== "") {
      setValidated(true);
      dispatch(
        addClassTimeTable(
          selectedClass.class_id,
          section.section_id,
          selectedTeacher.teacher_id,
          selectedSubject.course_id,
          selectedDay,
          selectedTime,
          endTime
        )
      );
    } else {
      setClassErr("Please enter class and section");
    }
  };

  ///////////////////////////////Update record/////////////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(loadClassSchedule());
  }, []);

  return (
    <div>
      <label className="table-lable top_none_margin">
        Create Class Schedule
      </label>
      <Form
        className="mb-3"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Select Teacher</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={
                  selectedTeacher.user_name
                    ? selectedTeacher.user_name
                    : "Teacher"
                }
                id="input-group-dropdown-1"
              >
                {teachers.map((teacher) => {
                  return (
                    <Dropdown.Item
                      eventKey={teacher.teacher_id}
                      onClick={() => {
                        setTeacherErr("");
                        setSelectedTeacher(teacher);
                      }}
                    >
                      {teacher.user_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <span
                className="invalid-feedback feed_active"
                style={{
                  fontWeight: "",
                  color: "#DC3545",
                }}
              >
                {teacherErr}
              </span>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Subject</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={
                  selectedSubject.course_name
                    ? selectedSubject.course_name
                    : "Subject"
                }
                id="input-group-dropdown-1"
              >
                {subjects.map((subject) => {
                  return (
                    <Dropdown.Item
                      eventKey={subject.course_id}
                      onClick={() => {
                        setSelectedSubject(subject);
                      }}
                    >
                      {subject.course_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <span
                className="invalid-feedback feed_active"
                style={{
                  fontWeight: "",
                  color: "#DC3545",
                }}
              >
                {teacherErr}
              </span>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Select Class</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={selectedClass.cl_name ? selectedClass.cl_name : "Class"}
                id="input-group-dropdown-1"
              >
                {all.map((grade) => {
                  return (
                    <Dropdown.Item
                      eventKey={grade.class_id}
                      onClick={() => {
                        setSection("");
                        setClassErr("");
                        setSelectedClass(grade);
                      }}
                    >
                      {grade.cl_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>

              <DropdownButton
                variant="outline-secondary"
                title={section.section_name ? section.section_name : "Section"}
                id="input-group-dropdown-1"
              >
                {selectedClass?.class_section?.map((section) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setClassErr("");
                        setSection(section);
                      }}
                    >
                      {section.section_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <span
                className="invalid-feedback feed_active"
                style={{
                  fontWeight: "",
                  color: "#DC3545",
                }}
              >
                {classErr}
              </span>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Select Day</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={selectedDay !== "" ? selectedDay : "Day"}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item
                  eventKey="0"
                  onClick={() => {
                    setSelectedDay("Monday");
                  }}
                >
                  Monday
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    setSelectedDay("Tuesday");
                  }}
                >
                  Tuesday
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    setSelectedDay("Wednesday");
                  }}
                >
                  Wednesday
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => {
                    setSelectedDay("Thrusday");
                  }}
                >
                  Thrusday
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="4"
                  onClick={() => {
                    setSelectedDay("Friday");
                  }}
                >
                  Friday
                </Dropdown.Item>
              </DropdownButton>
              <span
                className="invalid-feedback feed_active"
                style={{
                  fontWeight: "",
                  color: "#DC3545",
                }}
              >
                {classErr}
              </span>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Starting Time</Form.Label>
            <Form.Control
              type="Time"
              placeholder=""
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => {
                setSelectedTime(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="Time"
              placeholder=""
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <Button type="submit">
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
            <>Create Schedule</>
          )}
        </Button>
      </Form>

      <label className="table-lable">Detail</label>

      <Table class="table mt-6 border:1" bordered hover>
        <thead>
          <tr>
            <th scope="col">Teacher</th>
            <th scope="col">Subject</th>
            <th scope="col">Class</th>
            <th scope="col">Section</th>
            <th scope="col">Day</th>
            <th scope="col">Time</th>
            <th scope="col">Update Schedule</th>
          </tr>
        </thead>
        <tbody>
          {routine?.map((schdule) => (
            <tr>
              <td>{schdule}</td>
              <td>{schdule}</td>
              <td>{schdule}</td>
              <td>{schdule}</td>
              <td>{schdule}</td>
              <td>{schdule}</td>
              <td>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  onClick={handleShow}
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  onClick={handleShow}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ////////////////////////////Update Model////////////////////////////////// */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>Teacher</Form.Label>
                <Form.Control required type="text" placeholder="" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Label>Subject</Form.Label>
                <Form.Control required type="text" placeholder="" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom02">
                <Form.Label>Class</Form.Label>
                <Form.Control required type="text" placeholder="" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                <Form.Label>Section</Form.Label>
                <Form.Control type="text" placeholder="" required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" placeholder="" required />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" placeholder="" required />
              </Form.Group>
            </Row>
            <Button type="submit">Save changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </div>
  );
}

// render(<AllClassSchedule />);
export default AllClassSchedule;
