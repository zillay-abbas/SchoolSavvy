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
import moment from "moment";

import { loadSubjects } from "../../../App/Redux/Action/subjectActions";

import ShowToast from "../../../App/Toast";

import { useDispatch, useSelector } from "react-redux";

import {
  addClassTimeTable,
  loadClassSchedule,
  removeClassTimeSlot,
  updateClassTimeTable,
} from "../../../App/Redux/Action/classActions";

import { loadTeachers } from "../../../App/Redux/Action/teacherActions";

import "./AllClassSchedule.css";

function AllClassSchedule() {
  const { all, schedule, loading, msg, isDialog } = useSelector(
    (state) => state.class
  );
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

  const [selSec, setSelSec] = useState("");
  const [selClass, setSelClass] = useState("");
  const [selTeacher, setSelTeacher] = useState("");
  const [selSubject, setSelSubject] = useState("");
  const [selDay, setSelDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [selEndTime, setSelEndTime] = useState("");
  const [ttId, setTTId] = useState("");

  const [classErr, setClassErr] = useState("");
  const [teacherErr, setTeacherErr] = useState("");

  const [validated, setValidated] = useState(false);
  const [updateVal, setUpdateVal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }

    if (section !== "" && selectedClass !== "" && selectedTeacher !== "") {
      setValidated(true);
      dispatch(
        addClassTimeTable(
          selectedClass.class_id,
          section.section_id,
          selectedTeacher.user_id,
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

  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setUpdateVal(true);
    }

    if (
      selSec !== "" &&
      selClass !== "" &&
      selTeacher !== "" &&
      startTime !== "" &&
      selEndTime !== ""
    ) {
      setUpdateVal(true);
      console.log(selTeacher.user_id);
      dispatch(
        updateClassTimeTable(
          ttId,
          selClass.class_id,
          selSec.section_id,
          selTeacher.user_id,
          selSubject.course_id,
          selDay,
          startTime,
          selEndTime
        )
      );
    } else {
      setClassErr("Please enter class and section");
    }
  };

  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [remSec, setRemSec] = useState("");

  const handleClose = () => setShow(false);

  const handleShow = (schduleObj) => {
    setTTId(schduleObj?.timetable_id);
    setSelSec(schduleObj?.class_section);
    setSelClass(schduleObj?.school_class_room);
    setSelTeacher(schduleObj?.user);
    setSelSubject(schduleObj?.school_course);
    setSelDay(schduleObj?.tt_day);

    setStartTime(
      `${new Date(schduleObj?.tt_time_start).getHours() - 5} : ${new Date(
        schduleObj?.tt_time_start
      ).getMinutes()}`
    );

    setSelEndTime(
      ` ${new Date(schduleObj?.tt_time_end).getHours() - 5} : ${new Date(
        schduleObj?.tt_time_end
      ).getMinutes()}`
    );

    setShow(true);
  };

  useEffect(() => {
    dispatch(loadClassSchedule());
    dispatch(loadTeachers());
    dispatch(loadSubjects());
  }, []);

  const deleteSet = (schedule) => {
    setRemSec(schedule.timetable_id);
    setDeleteShow(true);
  };

  const Delete = () => {
    dispatch(removeClassTimeSlot(remSec));
    setDeleteShow(false);
  };

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
          {schedule?.map((schdule) => (
            <tr>
              <td>{schdule?.user?.user_name}</td>
              <td>{schdule?.school_course?.course_name}</td>
              <td>{schdule?.school_class_room?.cl_name}</td>
              <td>{schdule?.class_section?.section_name}</td>
              <td>{schdule?.tt_day}</td>
              <td>
                {moment.utc(schdule?.tt_time_start).format("hh:mm a") +
                  " - " +
                  moment.utc(schdule?.tt_time_end).format("hh:mm a")}
              </td>
              <td>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  onClick={() => {
                    handleShow(schdule);
                  }}
                >
                  Update
                </Button>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  onClick={() => deleteSet(schdule)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ////////////////////////////Update Model////////////////////////////////// */}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="mb-3"
            noValidate
            validated={updateVal}
            onSubmit={handleUpdate}
          >
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Select Teacher</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <DropdownButton
                    variant="outline-secondary"
                    title={selTeacher?.user_name}
                    id="input-group-dropdown-1"
                  >
                    {teachers.map((teacher) => {
                      return (
                        <Dropdown.Item
                          eventKey={teacher.teacher_id}
                          onClick={() => {
                            setTeacherErr("");
                            setSelTeacher(teacher);
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
                    title={selSubject?.course_name}
                    id="input-group-dropdown-1"
                  >
                    {subjects.map((subject) => {
                      return (
                        <Dropdown.Item
                          eventKey={subject.course_id}
                          onClick={() => {
                            setSelSubject(subject);
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
                    title={selClass.cl_name}
                    id="input-group-dropdown-1"
                  >
                    {all.map((grade) => {
                      return (
                        <Dropdown.Item
                          eventKey={grade.class_id}
                          onClick={() => {
                            setSelSec("");
                            setSelClass(grade);
                          }}
                        >
                          {grade.cl_name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>

                  <DropdownButton
                    variant="outline-secondary"
                    title={selSec === "" ? "Section" : selSec?.section_name}
                    id="input-group-dropdown-1"
                  >
                    {selClass?.class_section?.map((section) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            setSelSec(section);
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
                    title={selDay}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      eventKey="0"
                      onClick={() => {
                        setSelDay("Monday");
                      }}
                    >
                      Monday
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        setSelDay("Tuesday");
                      }}
                    >
                      Tuesday
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => {
                        setSelDay("Wednesday");
                      }}
                    >
                      Wednesday
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      onClick={() => {
                        setSelDay("Thrusday");
                      }}
                    >
                      Thrusday
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="4"
                      onClick={() => {
                        setSelDay("Friday");
                      }}
                    >
                      Friday
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Starting Time</Form.Label>
                <Form.Control
                  type="Time"
                  placeholder=""
                  aria-describedby="inputGroupPrepend"
                  title={startTime}
                  required
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="Time"
                  placeholder=""
                  aria-describedby="inputGroupPrepend"
                  title={selEndTime}
                  required
                  onChange={(e) => {
                    setSelEndTime(e.target.value);
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
                <>Update Schedule</>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}
      <Modal show={deleteShow} onHide={() => setDeleteShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>Subject will be remove from this schedule.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setDeleteShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={Delete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </div>
  );
}

// render(<AllClassSchedule />);
export default AllClassSchedule;
