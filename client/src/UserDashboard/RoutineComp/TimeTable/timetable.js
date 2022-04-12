import React, { useState } from "react";

import { Button, Form, Row, Col, Dropdown, InputGroup, ButtonGroup, DropdownButton } from "react-bootstrap";

import "./timetable.css";

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [value,setValue]=useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-5">
        <Dropdown className="drop1" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                {value === '' ? (<>Class</>) : value}
            </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">One</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Two</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Three</Dropdown.Item>
        <Dropdown.Item href="#/action-4">Four</Dropdown.Item>
        <Dropdown.Item href="#/action-5">Five</Dropdown.Item>
        <Dropdown.Item href="#/action-6">Six</Dropdown.Item>
        <Dropdown.Item href="#/action-7">Seven</Dropdown.Item>
        <Dropdown.Item href="#/action-8">Eigth</Dropdown.Item>
        <Dropdown.Item href="#/action-9">Nine</Dropdown.Item>
        <Dropdown.Item href="#/action-10">Matric</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    <Dropdown className="drop3" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {value === '' ? (<>Subject</>) : value}
            </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">English</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Urdu</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Maths</Dropdown.Item>
        <Dropdown.Item href="#/action-4">Pak Studies</Dropdown.Item>
        <Dropdown.Item href="#/action-5">Islamiyat</Dropdown.Item>
        <Dropdown.Item href="#/action-6">Bio</Dropdown.Item>
        <Dropdown.Item href="#/action-7">Computer</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    <Dropdown className="drop2" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {value === '' ? (<>Section</>) : value}
            </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">A</Dropdown.Item>
        <Dropdown.Item href="#/action-2">B</Dropdown.Item>
        <Dropdown.Item href="#/action-3">C</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <Dropdown className="drop3" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {value === '' ? (<>Teacher</>) : value}
            </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">English</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Urdu</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Maths</Dropdown.Item>
        <Dropdown.Item href="#/action-4">Pak Studies</Dropdown.Item>
        <Dropdown.Item href="#/action-5">Islamiyat</Dropdown.Item>
        <Dropdown.Item href="#/action-6">Bio</Dropdown.Item>
        <Dropdown.Item href="#/action-7">Computer</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    </div>
    <Row className="TimeRow">
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>Starting</Form.Label>
          <Form.Control
            required
            type="Time"
            placeholder="Starting Time"
            // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>Ending</Form.Label>
          <Form.Control
            required
            type="Time"
            placeholder="Ending Time"
            // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="Date"
            placeholder="Date"
            // defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="btnsb" type="submit">Create TimeTable</Button>
    </Form>
  );
}

// render(<FormExample />);
export default FormExample;