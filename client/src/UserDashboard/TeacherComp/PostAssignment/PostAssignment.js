import React from 'react'
import { Button, Form, Row, Col , Table } from "react-bootstrap";

import "./PostAssignment.css"
const PostAssignment = () => {
  return (
    <div className='container'>
       <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Select File</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""

          />
        </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Button type="submit" className="a_select-button">Choose File</Button>
        </Form.Group>

       </Row>

       <Row className="mb-3">
       <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""

          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Class</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""

          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Section</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""

          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label> Due Date</Form.Label>
          <Form.Control
            required
            type="datetime-local"
            placeholder=""

          />
        </Form.Group>

       </Row>

      <Button type="submit">Upload</Button>

    </Form>
    <div className="assignment_table mt-4">
          <Table class="table mt-6 border:1"  bordered hover>
<thead >
  <tr>
    <th scope="col"> Subject</th>
    <th scope="col">Class </th>
    <th scope="col">Section</th>
    <th scope="col"> Issue Date</th>
    <th scope="col"> Due Date</th>


  </tr>
  <tr>
    <td>Math</td>
    <td>5th</td>
    <td>B</td>
    <td>23 march</td>
    <td>23 march</td>
  </tr>
</thead>
</Table>
</div>
        </div>
  )
}

export default PostAssignment