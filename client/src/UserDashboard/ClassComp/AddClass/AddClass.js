import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import "./AddClass.css"

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
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name"
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Section*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Class Discription</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Discription"
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Teacher Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Batch*</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            // defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
       
      </Row>
    
      <Button type="submit">Create Class</Button>
      <Button type="submit" className="a_class-button">Remove Class</Button>

    </Form>
  );
}

// render(<FormExample />);
export default FormExample;
