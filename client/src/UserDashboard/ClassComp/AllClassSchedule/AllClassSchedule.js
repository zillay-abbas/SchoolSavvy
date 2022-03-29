import React, { useState } from "react";

import { Button, Form, Row, Col, Table , Modal} from "react-bootstrap";

import "./AllClassSchedule.css"

function AllClassSchedule() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

    ///////////////////////////////Update record/////////////////////////////////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 

  return (
      <div className="container">
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Label>Class Name</Form.Label>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            required
            type="text"
            placeholder="Search by Name"
            // defaultValue="Mark"
          />
          
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            required
            type="text"
            placeholder="Search by Id"
            // defaultValue="Mark"
          />
          
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            required
            type="text"
            placeholder="Search by Class"
            // defaultValue="Mark"
          />
          
        </Form.Group>
      <Button type="submit" md="3" className="a_button">Search</Button>
      </Row>
    </Form>

<Table class="table mt-6 border:1"  bordered hover>
<thead >
  <tr>
    <th scope="col">Teacher</th>
    <th scope="col">Subject</th>
    <th scope="col">Class</th>
    <th scope="col">Section</th>
    <th scope="col">Date</th>
    <th scope="col">Time</th>
    <th scope="col">Update Schedule</th>
  </tr>
  <tr>
    <td>Zillay</td>
    <td>Math</td>
    <td>5td </td>
    <td>B</td>
    <td>23 march</td>
    <td>10:50</td>
    <td>       
      <Button type="submit" className='a_LinkHeight' onClick={handleShow}>Update</Button>
      </td>
  </tr>
</thead>
</Table>


{/* ////////////////////////////Update Model////////////////////////////////// */}




<Modal show={show} onHide={handleClose}
centered
>
        <Modal.Header closeButton>
          <Modal.Title>Update Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Form>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Teacher</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustomUsername">
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
      <Button type="submit">Save changes</Button>
    </Form>
</Modal.Body>
      </Modal>

</div>
  );
}

// render(<AllClassSchedule />);
export default AllClassSchedule;
