import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  Accordion,
  InputGroup,
  Dropdown,
  DropdownButton,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addExam,
  addExamSchedule,
  loadExams,
  removeExam,
  updateExam,
} from "../../../App/Redux/Action/examActions";
import ShowToast from "../../../App/Toast";
import { GrAdd } from "react-icons/gr";
import moment from "moment";

import "./MidExams.css";
import { loadSchoolClasses } from "../../../App/Redux/Action/classActions";

const Exams = () => {
  const dispatch = useDispatch();
  const { isDialog, msg, all, loading } = useSelector((state) => state.exam);
  const { all: classes } = useSelector((state) => state.class);
  const { all: subjects } = useSelector((state) => state.subject);
  const { all: teachers } = useSelector((state) => state.teacher);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [dueErr, setDueErr] = useState("");
  const [examDueErr, setExamDueErr] = useState("");
  const [classErr, setClassErr] = useState("");
  const [teacherErr, setTeacherErr] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [scheduleShow, setScheduleShow] = useState(false);

  const [exam, setExam] = useState("");

  const handleUpdate = (item) => {
    setId(item?.exam_id);
    setName(item?.exam_name);
    setDate(item?.exam_start_date);
    setShow(true);
  };

  const handleCreate = () => {
    let current = new Date();
    let due = new Date(date);

    if (current < due) {
      if (id === "") {
        dispatch(addExam(name, date));
      } else {
        dispatch(updateExam(id, name, date));
      }
      setId("");
      setName("");
      setDate("");
    } else {
      setDueErr("Please set valid due date");
    }
  };

  const handleDelete = () => {
    dispatch(removeExam(id));
    setId("");
    setDeleteShow(false);
  };

  const handleSchedule = () => {
    if (selectedClass !== "" && selectedTeacher !== "") {
      let start = new Date(exam?.exam_start_date);
      let examDate = new Date(selectedDay);

      if (examDate >= start) {
        dispatch(
          addExamSchedule(
            exam.exam_id,
            selectedClass.class_id,
            selectedSection.section_id,
            selectedTeacher?.school_teacher?.teacher_id,
            selectedSubject.course_id,
            selectedDay,
            startTime,
            endTime
          )
        );
      } else {
        setExamDueErr("Please set valid due date");
      }
    } else {
      setClassErr("Please enter class and section");
    }
  };

  useEffect(() => {
    dispatch(loadExams());
    dispatch(loadSchoolClasses());
  }, []);

  return (
    <div>
      <Button
        type="submit"
        className="align_center"
        onClick={() => {
          setShow(true);
          setName("");
          setDate("");
        }}
      >
        <GrAdd className="svg_white" />
        &nbsp; Create Exam
      </Button>

      {/* Exams */}
      <div className="assignment_table mt-4">
        <Accordion>
          {all?.map((item) => (
            <Accordion.Item eventKey={item.exam_id} key={item.exam_id}>
              <Accordion.Header>{item?.exam_name}</Accordion.Header>
              <Accordion.Body>
                <div className="assign_card">
                  <Button variant="secondary" disabled>
                    Starts :{" "}
                    <strong>
                      {moment(item?.exam_start_date).format("DD/MM/yyyy")}
                    </strong>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setScheduleShow(true);
                      setExam(item);
                    }}
                  >
                    Schedule
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUpdate(item);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDeleteShow(true);
                      setId(item?.exam_id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Create/Update Modal */}
      <Modal
        show={show}
        onHide={() => {
          setId("");
          setName("");
          setShow(false);
        }}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Exam Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mid Term"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
                <span
                  className="invalid-feedback feed_active"
                  style={{
                    fontWeight: "",
                    color: "#DC3545",
                  }}
                >
                  {dueErr}
                </span>
              </Form.Group>
            </Row>
            <div className="btn_right">
              <Button onClick={handleCreate}>
                {id === "" ? "Create" : "Update"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal
        size="sm"
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <Modal.Title id="example-modal-sizes-title-sm">
            Remove Exam?
          </Modal.Title>
          Schedule of this exam will also be deleted
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Exam schedule */}
      <Modal
        size="lg"
        show={scheduleShow}
        onHide={() => setScheduleShow(false)}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Exam Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Select Class/Section</Form.Label>
              <InputGroup className="mb-3" hasValidation>
                <DropdownButton
                  variant="outline-secondary"
                  title={
                    selectedClass.cl_name ? selectedClass.cl_name : "Class"
                  }
                  id="input-group-dropdown-1"
                >
                  {classes.map((grade) => {
                    return (
                      <Dropdown.Item
                        eventKey={grade.class_id}
                        onClick={() => {
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
                  title={
                    selectedSection.section_name ? selectedSection.section_name : "Section"
                  }
                  id="input-group-dropdown-1"
                >
                  {selectedClass?.class_section?.map((section) => {
                    return (
                      <Dropdown.Item
                        eventKey={section.section_id}
                        onClick={() => {
                          setClassErr("");
                          setSelectedSection(section);
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
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Teacher</Form.Label>
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
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Select Date</Form.Label>
              <InputGroup className="mb-3" hasValidation>
                <Form.Control
                  type="date"
                  placeholder=""
                  aria-describedby="inputGroupPrepend"
                  required
                  onChange={(e) => {
                    setSelectedDay(e.target.value);
                    setExamDueErr("");
                  }}
                />
              </InputGroup>
              <span
                  className="invalid-feedback feed_active"
                  style={{
                    fontWeight: "",
                    color: "#DC3545",
                  }}
                >
                  {examDueErr}
                </span>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Starting Time</Form.Label>
              <Form.Control
                type="Time"
                placeholder=""
                aria-describedby="inputGroupPrepend"
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
                required
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setScheduleShow(false)}>
            Close
          </Button>
          <Button onClick={handleSchedule}>
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
              <>Create</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </div>
  );
};

export default Exams;
