import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
<<<<<<< HEAD
=======
import "./AddStudent.css"

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
<<<<<<< HEAD
          <Form.Control required type="text" placeholder="Student Name" />
=======
          <Form.Control
            required
            type="text"
            placeholder="Student Name"
            
          />
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Student Date of Birth</Form.Label>
<<<<<<< HEAD
          <Form.Control required type="date" placeholder="" />
=======
          <Form.Control
            required
            type="date"
            placeholder=""
          />
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
<<<<<<< HEAD
=======
            
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
<<<<<<< HEAD
      </Row>
      <Row className="mb-4">
=======
        </Row>
        <Row className="mb-4">
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
<<<<<<< HEAD

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
=======
      
      
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
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
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
<<<<<<< HEAD
=======
   
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
  );
}

// render(<FormExample />);
export default FormExample;
