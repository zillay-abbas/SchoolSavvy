import React from 'react'
import { Button, Form, Row, Col, InputGroup , Table } from "react-bootstrap";
import "./ClassAssignment.css"
const ClassAssignment = () => {
  return (
    <div className="container">
          <Form.Label className='_assignment-title'>Assignments</Form.Label>

          <div className="assignment_table">
          <Table class="table mt-6 border:1"  bordered hover>
<thead >
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Class </th>
    <th scope="col">Section</th>
    <th scope="col"> Due Date</th>
    <th scope="col"> Submission Date</th>
    <th scope="col">Submission Time</th>
    <th scope="col">Remarks</th>

  </tr>
  <tr>
    <td>Zillay</td>
    <td>5th </td>
    <td>B</td>
    <td>23 march</td>
    <td>23 march</td>
    <td>10:50 Pm</td>
    <td>9</td>
  </tr>
</thead>
<tbody>
  {/* <tr>
    <th scope="row">1</th>
    <td>Zillay</td>
    <td>Programming Fundamental</td>
    <td>9:50 to 10:50</td>
    <td>
    <Button type="submit" className='a_LinkHeight'>Join Class</Button>
    </td>
    </tr> */}
</tbody>
</Table>
          </div>
        
    </div>
  )
}

export default ClassAssignment