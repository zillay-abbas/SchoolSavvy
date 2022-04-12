import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Modal,
  InputGroup,
  DropdownButton,
  Dropdown,
  Spinner,
  Table,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import ShowToast from "../../../App/Toast";
import {
  addSubject,
  loadSubjects,
  removeSubject,
  updateSubject,
} from "../../../App/Redux/Action/subjectActions";

function Subject() {
  const dispatch = useDispatch();
  const { all, loading, msg, isDialog } = useSelector((state) => state.subject);
  const { all: grades } = useSelector((state) => state.class);

  const [updateShow, setUpdateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [validated, setValidated] = useState(false);
  const [validatedUpdate, setValidatedUpdate] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("");

  const [subjectId, setSubjectId] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedGrade, setUpdatedGrade] = useState("");

  const [subjectErr, setSubjectErr] = useState("");
  const [updateErr, setUpdateErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || grade === "") {
      setSubjectErr("Please fill the form complete");
    } else {
      dispatch(addSubject(name, description, grade.class_id));
    }
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    if (
      updatedName === "" ||
      updatedDescription === "" ||
      updatedGrade === ""
    ) {
      setUpdateErr("Please fill the form complete");
    } else {
      dispatch(
        updateSubject(subjectId, updatedName, updatedDescription, updatedGrade.class_id)
      );
    }
  };

  const updateSet = (subject) => {
    setUpdateShow(true);
    setSubjectId(subject.course_id);
    setUpdatedName(subject.course_name);
    setUpdatedDescription(subject.course_desription);
    setUpdatedGrade(subject.school_class_room);
  };

  const deleteSet = (subject) => {
    setDeleteShow(true);
    setSubjectId(subject.course_id);
  }

  const Delete = () => {
    dispatch(removeSubject(subjectId));
    setDeleteShow(false);
  };

  useEffect(() => {
    dispatch(loadSubjects());
  }, []);

  return (
    <>
      <label className="table-lable">Create new subject</label>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Subject Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              onFocus={() => setSubjectErr(false)}
              onChange={(e) => setName(e.target.value)}
              // defaultValue="Mark"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Subject Discription</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Discription"
              onFocus={() => setSubjectErr(false)}
              onChange={(e) => setDescription(e.target.value)}
              // defaultValue="Mark"
            />
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Select Class</Form.Label>
            <InputGroup className="mb-3" hasValidation>
              <DropdownButton
                variant="outline-secondary"
                title={grade.cl_name ? grade.cl_name : "Class"}
                id="input-group-dropdown-1"
                onFocus={() => setSubjectErr(false)}
              >
                {grades.map((grade) => {
                  return (
                    <Dropdown.Item
                      eventKey={grade.class_id}
                      onClick={() => {
                        setGrade(grade);
                      }}
                    >
                      {grade.cl_name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </InputGroup>
          </Form.Group>

          <span
            className="invalid-feedback feed_active"
            style={{
              fontWeight: "",
              color: "#DC3545",
            }}
          >
            {subjectErr}
          </span>
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
            <>Add Subject</>
          )}
        </Button>
      </Form>

      <label className="table-lable">Detail </label>

      <Table class="table mt-5 border:1" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Subject Name</th>
            <th scope="col">Subject Description</th>
            <th scope="col">Subject Class</th>
            <th scope="col">Update Subject</th>
          </tr>
        </thead>
        <tbody>
          {all?.map((subject) => {
            return (
              <tr>
                <td>{subject?.course_name}</td>
                <td>{subject?.course_desription}</td>
                <td>{subject?.school_class_room?.cl_name}</td>
                <td>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => updateSet(subject)}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => deleteSet(subject)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* /////////////////////////////////Update Model//////////////////////////////////////// */}
      <Modal
        show={updateShow}
        onHide={() => setUpdateShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Student Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validatedUpdate} onSubmit={updateSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={updatedName}
                  placeholder="Name"
                  onChange={(e) => setUpdatedName(e.target.value)}
                  // defaultValue="Mark"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Class Discription</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={updatedDescription}
                  placeholder="Discription"
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  // defaultValue="Mark"
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Select Class</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <DropdownButton
                    variant="outline-secondary"
                    title={updatedGrade.cl_name ? updatedGrade.cl_name : "Class"}
                    id="input-group-dropdown-1"
                    onFocus={() => setSubjectErr(false)}
                  >
                    {grades.map((grade) => {
                      return (
                        <Dropdown.Item
                          eventKey={grade.class_id}
                          onClick={() => {
                            setUpdatedGrade(grade);
                          }}
                        >
                          {grade.cl_name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </InputGroup>
              </Form.Group>

              <span
                className="invalid-feedback feed_active"
                style={{
                  fontWeight: "",
                  color: "#DC3545",
                }}
              >
                {updateErr}
              </span>
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
                <>Update Class</>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}
      <Modal show={deleteShow} onHide={() => setDeleteShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All records related to this section will be removed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setDeleteShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"subject"} />
    </>
  );
}

export default Subject;
