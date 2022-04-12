import React, { useState } from "react";

import YearPicker from "react-year-picker";

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
import {
  addClass,
  addClassSection,
  removeClass,
  removeClassSection,
  updateClass,
} from "../../../App/Redux/Action/classActions";

import ShowToast from "../../../App/Toast";

import "./AddClass.css";

function FormExample() {
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [Deleteshow, setDeleteShow] = useState(false);
  const [removeSectionShow, setRemoveSectionShow] = useState(false);
  const [removeSection, setRemoveSection] = useState("");

  const handleClose = () => {
    setDeleteShow(false);
    setUpdateShow(false);
    setShow(false);
  };

  const [validated, setValidated] = useState(false);
  const [validatedUpdate, setValidatedUpdate] = useState(false);

  const {
    all: grades,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.class);

  const [selectedClass, setSelectedClass] = useState("");
  const [section, setSection] = useState("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState("");

  const [classId, setClassId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updateYear, setUpdateYear] = useState("");

  const [classErr, setClassErr] = useState("");
  const [updateErr, setUpdateErr] = useState("");
  const [secErr, setSecErr] = useState("");
  const [secRemoveErr, setSecRemoveErr] = useState("");

  const dispatch = useDispatch();

  const handleSection = (e) => {
    e.preventDefault();
    if (section === "" || selectedClass === "") {
      setSecErr("Please select and section");
    } else {
      // setValidated(true);
      dispatch(addClassSection(section, selectedClass.class_id));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (year === "") {
        setClassErr("Please select batch year");
      } else {
        setValidated(true);
        dispatch(addClass(name, desc, year));
      }
    }

    setValidated(true);
  };

  const handleEdit = (grade) => {
    setUpdateShow(true);
    setClassId(grade.class_id);
    setUpdateName(grade.cl_name);
    setUpdateDesc(grade.cl_description);
    setUpdateYear(grade.cl_batch_year);
  };

  const updateSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (updateName === "" || updateDesc === "" || updateYear === "") {
        setUpdateErr("Please complete all inputs");
      } else {
        setValidatedUpdate(true);
        dispatch(updateClass(classId, updateName, updateDesc, updateYear));
      }
    }

    setValidatedUpdate(true);
  };

  const handleDelete = (gradeId) => {
    setDeleteShow(true);
    setClassId(gradeId);
  };

  const Delete = () => {
    dispatch(removeClass(classId));
    setDeleteShow(false);
  };

  const RemoveSection = () => {
    if(removeSection === ""){
      setSecErr("Please select section to remove");
    }
    else {
      dispatch(removeClassSection(removeSection.section_id));
      setRemoveSection("");
      setSelectedClass("");
      setRemoveSectionShow(false);
    }
  };

  return (
    <>
      <label className="table-lable">Create new class</label>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              // defaultValue="Mark"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Class Discription</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Discription"
              onChange={(e) => setDesc(e.target.value)}
              // defaultValue="Mark"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Select Batch Year</Form.Label>
            <YearPicker onChange={(value) => setYear(value)} />
          </Form.Group>
          <span
            className="invalid-feedback feed_active"
            style={{
              fontWeight: "",
              color: "#DC3545",
            }}
          >
            {classErr}
          </span>
        </Row>
        <div className="btn_row">
          <div className="btn_form">
            <Button type="submit">Create Class</Button>
          </div>
          <div className="btn_form">
            <Button
              onClick={() => {
                setSection("");
                setSelectedClass("");
                setShow(true);
              }}
            >
              Create Section
            </Button>
          </div>
          <div className="btn_form">
            <Button onClick={() => {setRemoveSectionShow(true)}}>Remove Section</Button>
          </div>
        </div>
      </Form>

      <label className="table-lable">Detail</label>

      <Table class="table mt-5 border:1" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Class Name</th>
            <th scope="col">Class Batch</th>
            <th scope="col">Class Sections</th>
            <th scope="col">Update Class</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => {
            return (
              <tr>
                <td>{grade.cl_name}</td>
                <td>{grade.cl_batch_year}</td>
                <td>
                  {" "}
                  <InputGroup hasValidation>
                    <DropdownButton
                      variant="outline-secondary"
                      title={
                        grade.class_section.length > 0
                          ? "Class Sections"
                          : "No Section"
                      }
                      id="input-group-dropdown-1"
                    >
                      {grade.class_section.map((section) => {
                        return (
                          <Dropdown.Item
                            eventKey={grade.class_id}
                            onClick={() => {
                              setClassErr("");
                              setSelectedClass(grade);
                            }}
                          >
                            {section.section_name}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </InputGroup>{" "}
                </td>

                <td>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => handleEdit(grade)}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => handleDelete(grade.class_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* /////////////////////////////////Sectin Create Model//////////////////////////////////////// */}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Class Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSection}>
            <Row className="mb-4">
              <Form.Group as={Col} md="6" className="mt-3">
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
                            setClassErr("");
                            setSelectedClass(grade);
                          }}
                        >
                          {grade.cl_name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mt-3">
                <Form.Label>Select Section</Form.Label>
                <InputGroup className="mb-3" hasValidation>
                  <DropdownButton
                    variant="outline-secondary"
                    title={section !== "" ? section : "Section"}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      onClick={() => {
                        setSecErr("");
                        setSection("A");
                      }}
                    >
                      A
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSecErr("");
                        setSection("B");
                      }}
                    >
                      B
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSecErr("");
                        setSection("C");
                      }}
                    >
                      C
                    </Dropdown.Item>
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
                {secErr}
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
                <>Add Section</>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Update Model//////////////////////////////////////// */}
      <Modal
        show={updateShow}
        onHide={handleClose}
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
                  value={updateName}
                  placeholder="Name"
                  onChange={(e) => setUpdateName(e.target.value)}
                  // defaultValue="Mark"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Class Discription</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={updateDesc}
                  placeholder="Discription"
                  onChange={(e) => setUpdateDesc(e.target.value)}
                  // defaultValue="Mark"
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Select Batch Year</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={updateYear}
                  placeholder="Batch"
                  onChange={(e) => setUpdateYear(e.target.value)}
                  // defaultValue="Mark"
                />
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
      <Modal show={Deleteshow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delet Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All records related to this class will be removed
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* /////////////////////////////////Section Remove Model//////////////////////////////////////// */}
      <Modal show={removeSectionShow} onHide={() => setRemoveSectionShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSection}>
              <Row className="mb-4">
                <Form.Group as={Col} md="6" className="mt-3">
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
                              setClassErr("");
                              setSelectedClass(grade);
                            }}
                          >
                            {grade.cl_name}
                          </Dropdown.Item>
                        );
                      })}
                    </DropdownButton>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6" className="mt-3">
                  <Form.Label>Select Section</Form.Label>
                  <InputGroup className="mb-3" hasValidation>
                    <DropdownButton
                      variant="outline-secondary"
                      title={removeSection !== "" ? removeSection.section_name : "Section"}
                      id="input-group-dropdown-1"
                    >
                      {selectedClass?.class_section?.map((section) => {
                        return (
                          <Dropdown.Item
                            eventKey={section.section_id}
                            onClick={() => {setRemoveSection(section)}}
                          >
                            {section.section_name}
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
                  {secErr}
                </span>
              </Row>
            </Form>
          </Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setRemoveSectionShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={RemoveSection}>
            Reomve
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </>
  );
}

// render(<FormExample />);
export default FormExample;
