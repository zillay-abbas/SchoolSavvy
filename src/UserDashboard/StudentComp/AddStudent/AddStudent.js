import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSchoolClasses } from "../../../App/Redux/Action/classActions";
import { createStudent } from "../../../App/Redux/Action/studentActions";

import ShowToast from "../../../App/Toast";

import "./AddStudent.css";

function FormExample() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dob, setdob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [classErr, setClassErr] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.class);
  const { loading, msg, isDialog } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(loadSchoolClasses());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (section !== "" && selectedClass !== "") {
        setValidated(true);
        dispatch(
          createStudent(
            id,
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
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Student ID"
            onChange={(e) => {
              setClassErr("");
              setId(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Student Name"
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
            onChange={(e) => {
              setClassErr("");
              setdob(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group
          as={Col}
          md="4"
          className="mt-3"
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
          <>Add Student</>
        )}
      </Button>
      <ShowToast show={isDialog} msg={msg} from={"student"} />
    </Form>
  );
}

// render(<FormExample />);
export default FormExample;
