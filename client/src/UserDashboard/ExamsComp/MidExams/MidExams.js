import React, {useState} from 'react'
import { Button, Form, Row, Col , Table, Modal, InputGroup } from "react-bootstrap";

import "./MidExams.css"

const MidExams = () => {

     ///////////////////////////////Update record/////////////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>



    <div className="assignment_table mt-4">
          <Table class="table mt-6 border:1"  bordered hover>
<thead >
  <tr>
    <th scope="col"> Subject</th>
    <th scope="col">Class </th>
    <th scope="col">Section</th>
    <th scope="col"> Due Date</th>
    <th scope="col"> Time</th>
    <th scope="col">Update Schedule</th>


  </tr>
  <tr>
    <td>Math</td>
    <td>5th</td>
    <td>B</td>
    <td>23 march</td>
    <td>10:50 am</td>
    <td>       
      <Button type="submit" className='a_LinkHeight' onClick={handleShow}>Update</Button>
      </td>
  </tr>
</thead>
</Table>
</div>



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
      <Button type="submit">Save changes</Button>
    </Form>
</Modal.Body>
      </Modal>

    </div>
  )
}

export default MidExams