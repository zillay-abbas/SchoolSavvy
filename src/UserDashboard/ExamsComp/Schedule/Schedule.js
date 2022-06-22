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
import { useDispatch, useSelector } from "react-redux";
import {
  loadExams,
  removeExamSchedule,
  updateExamSchedule,
} from "../../../App/Redux/Action/examActions";
import moment from "moment";

import "./FinalExams.css";
import ShowToast from "../../../App/Toast";

const Schedule = () => {
  const dispatch = useDispatch();
  const {
    all: exams,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.exam);
  const { all: classes } = useSelector((state) => state.class);
  const { all: subjects } = useSelector((state) => state.subject);
  const { all: teachers } = useSelector((state) => state.teacher);

  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [selectedExam, setSelectedExam] = useState("");

  const [examSchedule, setExamSchedule] = useState("");

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

  const handleShow = (schdule) => {
    setShow(true);
    setExamSchedule(schdule);

    setSelectedClass(schdule?.school_class_room);
    setSelectedSection(schdule?.class_section);
    setSelectedSubject(schdule?.school_course);
    setSelectedTeacher(schdule?.school_teacher);
    setSelectedDay(schdule?.date);
    setStartTime(moment.utc(schdule?.start_time).format("hh:mm"));
    setEndTime(moment.utc(schdule?.end_time).format("hh:mm"));
  };

  const handleShowClose = () => {
    setShow(false);
    setExamSchedule("");

    setSelectedClass("");
    setSelectedSubject("");
    setSelectedTeacher("");
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
  };

  const handleSchedule = () => {
    if (selectedClass !== "" && selectedTeacher !== "") {
      let start = new Date(selectedExam?.exam_start_date);
      let examDate = new Date(selectedDay);

      if (examDate >= start) {
        dispatch(
          updateExamSchedule(
            examSchedule?.id,
            selectedClass.class_id,
            selectedSection.section_id,
            selectedSubject.course_id,
            selectedTeacher?.teacher_id,
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

  const handleDelete = () => {
    dispatch(removeExamSchedule(examSchedule?.id));
    setExamSchedule("");
    setDeleteShow(false);
  };

  useEffect(() => {
    dispatch(loadExams());
  }, []);

  return (
    <div>
      <Form.Label>Select Exam</Form.Label>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <InputGroup className="mb-3" hasValidation>
          <DropdownButton
            variant="outline-secondary"
            title={selectedExam.exam_name ? selectedExam.exam_name : "No Exam"}
            id="input-group-dropdown-1"
          >
            {exams.map((exam) => {
              return (
                <Dropdown.Item
                  eventKey={exam.exam_id}
                  onClick={() => {
                    setSelectedExam(exam);
                  }}
                >
                  {exam.exam_name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </InputGroup>
      </Form.Group>

      <div className="assignment_table mt-4">
        <label className="table-lable">Exam Schedule</label>
        <Table class="table mt-6 border:1" bordered hover>
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Class</th>
              <th scope="col">Section</th>
              <th scope="col">Teacher</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Update/Delete Schedule</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => {
              if (exam?.exam_id === selectedExam?.exam_id) {
                return exam.exam_schedule.map((schedule) => (
                  <tr>
                    <td>{schedule?.school_course?.course_name}</td>
                    <td>{schedule?.school_class_room?.cl_name}</td>
                    <td>{schedule?.class_section?.section_name}</td>
                    <td>{schedule?.school_teacher?.user?.user_name}</td>
                    <td>{moment(schedule?.date).format("DD/MM/yyyy")}</td>
                    <td>
                      {moment.utc(schedule?.start_time).format("hh:mm a") +
                        " - " +
                        moment.utc(schedule?.end_time).format("hh:mm a")}
                    </td>
                    <td>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          handleShow(schedule);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          setDeleteShow(true);
                          setExamSchedule(schedule);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ));
              }
            })}
          </tbody>
        </Table>
      </div>

      {/* ////////////////////////////Schedule Update Model////////////////////////////////// */}
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          handleShowClose();
        }}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Exam Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Select Class/Section</Form.Label>
              <InputGroup className="mb-3" hasValidation>
                <DropdownButton
                  variant="outline-secondary"
                  title={
                    selectedClass?.cl_name ? selectedClass?.cl_name : "Class"
                  }
                  id="input-group-dropdown-1"
                >
                  {classes.map((grade) => {
                    return (
                      <Dropdown.Item
                        eventKey={grade.class_id}
                        onClick={() => {
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
          <Button
            variant="secondary"
            onClick={() => {
              handleShowClose();
            }}
          >
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
              <>Update</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        size="sm"
        show={deleteShow}
        onHide={() => {
          setDeleteShow(false);
          setExamSchedule("");
        }}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <Modal.Title id="example-modal-sizes-title-sm">
            Remove Exam Schedule?
          </Modal.Title>
          Schedule of this exam will also be removed
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteShow(false);
              setExamSchedule("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </div>
  );
};

export default Schedule;
