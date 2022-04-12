import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

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
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Parent/Guardian Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Parent name"
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone Number"
            // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>  
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="Password"
            placeholder="Password"
            // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control type="Date"  placeholder="Date Of Birth" required />
          <Form.Control.Feedback type="invalid">
            
          </Form.Control.Feedback>
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
      <Button type="submit">Create School</Button>
    </Form>
  );
}

// render(<FormExample />);
export default FormExample;
