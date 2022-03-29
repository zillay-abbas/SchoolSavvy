import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import "./AddStudent.css"

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Student Name"
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Student Date of Birth</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label> Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Useremail"
              aria-describedby="inputGroupPrepend"
              required
            />
            
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        </Row>
        <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustomUserPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Correct Password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      
      
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Join Date</Form.Label>
          <Form.Control
              type="date"
              placeholder=""
              aria-describedby="inputGroupPrepend"
              required
            />
        </Form.Group>
        </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Add Student</Button>
    </Form>
   
  );
}

// render(<FormExample />);
export default FormExample;
