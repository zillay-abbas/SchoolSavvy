import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
  Accordion,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  addImg,
  loadAssignments,
  loadTeacherClasses,
  removeAssignment,
  updateAssignment,
} from "../../../App/Redux/Action/classActions";

import ShowToast from "../../../App/Toast";

import { GrAdd } from "react-icons/gr";

import Assigned from "./Assigned/Assigned";
import Handedin from "./Handedin/Handedin";

import "./PostAssignment.css";

const PostAssignment = () => {
  const dispatch = useDispatch();
  const {
    all: classes,
    assignment,
    msg,
    isDialog,
    schedule,
  } = useSelector((state) => state.class);
  const { current: teacher } = useSelector((state) => state.teacher);

  const subjectRec = [];

  const [isUpdate, setIsUpdate] = useState(false);

  const [assignmentId, setAssignmentId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [img, setimg] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [assignedTask, setAssignedTask] = useState("");
  const [handedinTask, setHandedinTask] = useState("");

  const [handedinId, setHandedinId] = useState("");

  const [dueErr, setDueErr] = useState("");
  const [inCompleteErr, setinCompErr] = useState("");

  const [delId, setDelId] = useState("");

  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [assignedShow, setAssignedShow] = useState(false);
  const [handedInShow, setHandedInShow] = useState(false);

  useEffect(() => {
    dispatch(loadAssignments());
    dispatch(loadTeacherClasses());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let due = new Date(dueDate);
    let current = new Date();

    if (
      file === "" ||
      subject === "" ||
      grade === "" ||
      section === "" ||
      dueDate === ""
    ) {
      setinCompErr("Please fill form complete");
    } else {
      if (due > current) {
        const data = new FormData();

        data.append("title", title);
        data.append("file", file);
        data.append("subject", subject?.course_id);
        data.append("grade", grade?.class_id);
        data.append("section", section?.section_id);
        data.append("dueDate", dueDate);
        data.append("marks", totalMarks);
        data.append("teacher", teacher?.user_id);

        if (isUpdate) {
          data.append("id", assignmentId);

          dispatch(updateAssignment(data));

          setIsUpdate(false);

          setAssignmentId("");
          setTitle("");
          setSubject("");
          setGrade("");
          setSection("");
          setDueDate("");
          setTotalMarks("");
        } else {
          dispatch(addAssignment(data));
        }

        setShow(false);
      } else {
        setDueErr("Please set valid due date");
      }
    }
  };

  const uploadImg = (e) => {
    e.preventDefault();

    if (img === "") {
    } else {
      const data = new FormData();

      data.append("file", img);
      data.append("teacher", teacher?.user_id);
      
      dispatch(addImg(data));
    }
  };

  const handleDeleteShow = (id) => {
    setDeleteShow(true);
    setDelId(id);
  };

  const handleDelete = () => {
    dispatch(removeAssignment(parseInt(delId)));
    setDelId("");
    setDeleteShow(false);
  };

  const handleEdit = (task) => {
    setIsUpdate(true);
    setShow(true);

    setAssignmentId(task.id);
    setTitle(task?.name);
    setSubject(task?.school_course);
    setGrade(task?.school_class_room);
    setSection(task?.class_section);
    setDueDate(task?.dueDate);
    setTotalMarks(task?.totalmarks);
  };

  const handleAssigned = (task) => {
    setAssignedTask(task);
    setAssignedShow(true);
  };

  return (
    <div className="container">
      <Button
        type="submit"
        className="align_center"
        onClick={() => setShow(true)}
      >
        <GrAdd className="svg_white" />
        &nbsp; Create Assignment
      </Button>

      <br></br>

      <Form.Group
        className="mb-3"
        as={Col}
        md="4"
        controlId="validationCustom01"
      >
        <Form.Label>Select File</Form.Label>
        <Form.Control
          required
          type="file"
          placeholder=""
          onChange={(e) => setimg(e.target.files[0])}
        />
      </Form.Group>

      <Button type="submit" className="align_center" onClick={uploadImg}>
        &nbsp; Upload Img
      </Button>

      {/* Assignment Items */}
      <div className="assignment_table mt-4">
        {assignment?.length === 0 ? (
          <label className="table-lable">
            Your created assignmnets will appear here
          </label>
        ) : (
          <Accordion>
            {assignment?.map((item) => (
              <Accordion.Item eventKey={item?.id} key={item?.id}>
                <Accordion.Header>
                  <span className="pad_rig">{item?.name}</span>{" "}
                  <span className="">
                    {item?.school_class_room?.cl_name} &nbsp;Section:&nbsp;
                  </span>{" "}
                  <span className="pad_assign">
                    {item?.class_section?.section_name}
                  </span>{" "}
                  &nbsp;Points:&nbsp;
                  <span className="">{item?.totalmarks}</span>{" "}
                </Accordion.Header>
                <Accordion.Body>
                  <div className="assign_card">
                    <Button
                      variant="secondary"
                      // disabled={school?.id === item?.school_id ? true : false}
                      onClick={() => handleAssigned(item)}
                    >
                      Assigned : <strong>{item?.assigned?.length}</strong>
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setHandedinTask(item);
                        setHandedinId(item?.id);
                        setHandedInShow(true);
                      }}
                    >
                      Handed in : <strong>{item.handedIn.length}</strong>
                    </Button>{" "}
                    <Button variant="primary" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="primary"
                      onClick={() => handleDeleteShow(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>

      {/* Create/Update Modal */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setGrade("");
          setSection("");
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Topic"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  required
                  type="datetime-local"
                  onChange={(e) => {
                    setDueErr("");
                    setDueDate(e.target.value);
                  }}
                  value={dueDate}
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

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Total Marks</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="0"
                  onChange={(e) => {
                    setTotalMarks(e.target.value);
                  }}
                  value={totalMarks}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                as={Col}
                md="4"
                controlId="validationCustom01"
              >
                <Form.Label>Select File</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder=""
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Class/Section</Form.Label>
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
                    title={
                      section.section_name ? section.section_name : "Section"
                    }
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

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Subject</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <DropdownButton
                    variant="outline-secondary"
                    title={
                      subject.course_name ? subject.course_name : "Subject"
                    }
                    id="input-group-dropdown-1"
                  >
                    {schedule.map((subject) => {
                      let isExists = subjectRec.some(
                        (reccSubject) =>
                          reccSubject === subject?.school_course?.course_id
                      );
                      if (!isExists) {
                        subjectRec.push(subject?.school_course?.course_id);
                        return (
                          <Dropdown.Item
                            eventKey={subject.timetable_id}
                            onClick={() => {
                              setSubject(subject?.school_course);
                            }}
                          >
                            {subject?.school_course?.course_name}
                          </Dropdown.Item>
                        );
                      }
                    })}
                  </DropdownButton>
                </InputGroup>
              </Form.Group>
            </Row>
            <span
              className="invalid-feedback feed_active"
              style={{
                fontWeight: "",
                color: "#DC3545",
              }}
            >
              {inCompleteErr}
            </span>
            <Button type="submit">{isUpdate ? "Update" : "Upload"}</Button>
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
            Delete Assignmnet?
          </Modal.Title>
          Marks and student submission will also be deleted
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assigned Modal */}
      <Modal
        show={assignedShow}
        onHide={() => {
          setAssignedShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assigned Students Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Assigned task={assignedTask} />
        </Modal.Body>
      </Modal>

      {/* Handedin Modal */}
      <Modal
        show={handedInShow}
        onHide={() => {
          setHandedInShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assigned Students Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Handedin task={handedinTask} />
        </Modal.Body>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </div>
  );
};

export default PostAssignment;
