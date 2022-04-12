import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { Button, Form, Row, Col, Dropdown, Table,InputGroup, ButtonGroup, DropdownButton } from "react-bootstrap";

import "./markattend.css";

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
      <Row className="mb-3">
        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label>Select Class</Form.Label>
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
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>Select Subject</Form.Label>
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
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>Select Section</Form.Label>
          <Dropdown className="drop3" onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {value === '' ? (<>Section</>) : value}
            </Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">A</Dropdown.Item>
        <Dropdown.Item href="#/action-2">B</Dropdown.Item>
        <Dropdown.Item href="#/action-3">C</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Button className="btnsb" type="submit">Save Attendance</Button>
      <Button className="btnrst" type="submit">Reset Attendance</Button>


      <Table className="table1">
  <thead >
    <tr>
      <th scope="col"><FontAwesomeIcon className='checkbox' icon="check-square" />Students</th>
      <th scope="col">1</th>
      <th scope="col">2</th>
      <th scope="col">3</th>
      <th scope="col">4</th>
      <th scope="col">5</th>
      <th scope="col">6</th>
      <th scope="col">7</th>
      <th scope="col">8</th>
      <th scope="col">9</th>
      <th scope="col">10</th>
      <th scope="col">11</th>
      <th scope="col">12</th>
      <th scope="col">13</th>
      <th scope="col">14</th>
      <th scope="col">15</th>
      <th scope="col">16</th>
      <th scope="col">17</th>
      <th scope="col">18</th>
      <th scope="col">19</th>
      <th scope="col">20</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Max</th>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
    </tr>
    <tr>
    <th scope="row">Ali</th>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
    </tr>
    <tr>
    <th scope="row">Ahmed</th>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
    </tr>
    <tr>
    <th scope="row">Erin</th>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa fa-window-close" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
      <td><FontAwesomeIcon icon="fa-solid fa-check" /></td>
    </tr>
  </tbody>
</Table>


    </Form>
  );
}

// render(<FormExample />);
export default FormExample;