import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import "./AddMidExam.css"
const AddMidExam = () => {
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
          <Form.Label>Subject</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Section</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              required
            />
         
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" placeholder="" required />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" placeholder="" required />
        </Form.Group>
      </Row>
      <Button type="submit">Add</Button>
      </Form>
     
    );
}

export default AddMidExam