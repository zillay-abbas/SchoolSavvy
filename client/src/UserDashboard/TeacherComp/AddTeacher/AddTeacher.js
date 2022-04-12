import React, { useState } from "react";

import ShowToast from "../../../App/Toast";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTeacher } from "../../../App/Redux/Action/teacherActions";
import "./AddTeacher.css";

function AddTeacher() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const { isDialog, msg } = useSelector(state => state.teacher);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    setValidated(true);
    dispatch(createTeacher(name, email, password, description, contact, city));
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Teacher Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Teacher Name"
            defaultValue=""
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>About Teacher</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Description"
            defaultValue=""
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Teacher Contact</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Contact"
            defaultValue=""
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a city.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Teacher Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button type="submit">Add Teacher</Button>

      <ShowToast show={isDialog} msg={msg} from={"teacher"} />

    </Form>
  );
}

// render(<AddTeacher />);
export default AddTeacher;
