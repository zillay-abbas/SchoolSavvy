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
  loadSchoolStudents,
  removeStudent,
  searchFromState,
  updateStudent,
} from "../../../App/Redux/Action/studentActions";
import Moment from "react-moment";

import ShowToast from "../../../App/Toast";

import "./ViewStudent.css";

const ViewStudent = () => {
  const dispatch = useDispatch();
  const { all, loading, msg, isDialog, isSearch, searchedStudent } =
    useSelector((state) => state.student);
  const { all: grades } = useSelector((state) => state.class);

  const [classErr, setClassErr] = useState("");
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");
  const [regNo, setRegNo] = useState("");
  const [name, setName] = useState("");
  const [dob, setdob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");


  const [stdReg, setStdReg] = useState("");
  const [searchStd, setSearchStd] = useState("");

  ///////////////////////////////Update record/////////////////////////////////

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleEdit = (stdId) => {
    setShow(true);
    setId(stdId);
    const student = all.find(
      (student) => student?.school_student?.student_id === stdId
    );

    setRegNo(student.school_student.student_reg_no);
    setName(student.user_name);
    setEmail(student.user_email);
    setdob(student.school_student.student_dob);
    setSelectedClass(student.school_student.school_class_room);
    setSection(student.school_student.class_section);
  };

  //////////////////////////Delete Record////////////////////////////

  const [Deleteshow, setDeleteShow] = useState(false);

  const DeletehandleClose = () => setDeleteShow(false);

  const handleDelete = (stdId) => {
    setDeleteShow(true);
    setId(stdId);
  };

  const Delete = () => {
    dispatch(removeStudent(id));
    DeletehandleClose();
  };

  useEffect(() => {
    console.log("search student");
    dispatch(loadSchoolStudents());
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    if (section !== "" && selectedClass !== "") {
      setValidated(true);
      await dispatch(
        updateStudent(
          id,
          regNo,
          name,
          dob,
          email,
          password,
          selectedClass.class_id,
          section.section_id
        )
      );
    } else {
      setClassErr("Please enter class and section");
    }
  };

  useEffect(() => {
    console.log(stdReg);
    setSearchStd(
      all.filter(
        (student) => student?.school_student?.student_reg_no === stdReg
      )
    );
  }, [stdReg]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // dispatch(searchFromState(stdReg));
    setSearchStd(
      all.filter(
        (student) => student?.school_student?.student_reg_no === stdReg
      )
    );
  };

  return (
    <div className="container visibile">
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Search by Student Id</Form.Label>
            <Form.Control
              required
              type="text"
              autoComplete="off"
              placeholder="Search..."
              onChange={(e) => {
                setStdReg(e.currentTarget.value);
                handleSearch(e);
              }}
            />
          </Form.Group>
        </Row>
        <Button type="submit" disabled={stdReg === "" ? true : false}>
          Search
        </Button>
      </Form>

      <label className="table-lable">Detail </label>

      <Table className="table mt-4" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Class</th>
            <th scope="col">Section</th>
            <th scope="col">Update or Delete</th>
          </tr>
        </thead>
        <tbody>
          {stdReg !== "" ? (
            searchStd?.length > 0 ? (
              searchStd?.map((student) => {
                return (
                  <tr>
                    <td>{student?.school_student?.student_reg_no}</td>
                    <td>{student?.user_name}</td>
                    <td>{student?.user_email}</td>
                    <td>
                      <Moment
                        format="YYYY/MM/DD"
                        date={student?.school_student?.student_dob}
                      />
                    </td>
                    <td>
                      {student?.school_student?.school_class_room?.cl_name}
                    </td>
                    <td>
                      {student?.school_student?.class_section?.section_name}
                    </td>
                    <td>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() =>
                          handleEdit(student?.school_student?.student_id)
                        }
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => handleDelete(student?.user_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>No student found</>
            )
          ) : (
            all.map((student) => {
              return (
                <tr>
                  <td>{student?.school_student?.student_reg_no}</td>
                  <td>{student?.user_name}</td>
                  <td>{student?.user_email}</td>
                  <td>
                    <Moment
                      format="YYYY/MM/DD"
                      date={student?.school_student?.student_dob}
                    />
                  </td>
                  <td>{student?.school_student?.school_class_room?.cl_name}</td>
                  <td>
                    {student?.school_student?.class_section?.section_name}
                  </td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() =>
                        handleEdit(student?.school_student?.student_id)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => handleDelete(student?.user_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
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
          <Modal.Title>Update Student Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Student ID"
                  value={regNo}
                  onChange={(e) => {
                    setClassErr("");
                    setRegNo(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => {
                    setClassErr("");
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Student Date of Birth</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder=""
                  value={
                    dob ? new Date(dob)?.toISOString()?.substring(0, 10) : <></>
                  }
                  onChange={(e) => {
                    setClassErr("");
                    setdob(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mt-3"
                md="4"
                controlId="validationCustomUsername"
              >
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Student Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={email}
                    onChange={(e) => {
                      setClassErr("");
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mt-3"
                controlId="validationCustomUserPassword"
              >
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => {
                      setClassErr("");
                      setPassword(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" className="mt-3">
                <Form.Label>Select Class</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <DropdownButton
                    variant="outline-secondary"
                    title={
                      selectedClass.cl_name ? selectedClass.cl_name : "Class"
                    }
                    id="input-group-dropdown-1"
                  >
                    {grades.map((grade) => {
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
                    title={
                      section.section_name ? section.section_name : "Section"
                    }
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
                <>Update Student</>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}

      <Modal show={Deleteshow} onHide={DeletehandleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Delete this Student's Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      <ShowToast show={isDialog} msg={msg} from={"student"} />
    </div>
  );
};

export default ViewStudent;
