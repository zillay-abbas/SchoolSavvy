import React, { useEffect,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Form, Row, Col, Table, FormCheck } from "react-bootstrap";

import "./viewtable.css";

const ViewTeacher = () => {

  return (
    <div className="container  visibile">
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            
            required
            type="text"
            placeholder="Search By Class"

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            
            required
            type="text"
            placeholder="Search By Day"

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Control
            
            required
            type="text"
            placeholder="Search By Section"

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Button type="submit">Search</Button>
        </Form.Group>
      </Row> 
    </Form>

    <label className='table-lable'>Time Table</label>

    <Table className="table1">
  <thead >
    <tr>
      <th scope="col"><FontAwesomeIcon className='checkbox' icon="check-square" />Day</th>
      <th scope="col">Class</th>
      <th scope="col">Subject</th>
      <th scope="col">Section</th>
      <th scope="col">Teacher</th>
      <th scope="col">Time</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><FontAwesomeIcon className='checkbox' icon="check-square" />Monday</th>
      <td>One</td>
      <td>Chemistry</td>
      <td>B</td>
      <td>Ali</td>
      <td>10:00-11:00</td>
      <td>12/03/2022</td>
      <td><FontAwesomeIcon icon="fas fa-ellipsis-h" /></td>
    </tr>
    <tr>
      <th scope="row"><FontAwesomeIcon className='checkbox' icon="check-square" />Tuesday</th>
      <td>One</td>
      <td>Physics</td>
      <td>B</td>
      <td>John</td>
      <td>11:00-12:00</td>
      <td>13/03/2022</td>
      <td><FontAwesomeIcon icon="fas fa-ellipsis-h" /></td>
    </tr>
    <tr>
      <th scope="row"><FontAwesomeIcon className='checkbox' icon="check-square" />Wednesday</th>
      <td>One</td>
      <td>Maths</td>
      <td>B</td>
      <td>Max</td>
      <td>12:00-01:00</td>
      <td>14/03/2022</td>
      <td><FontAwesomeIcon icon="fas fa-ellipsis-h" /></td>
    </tr>
    <tr>
      <th scope="row"><FontAwesomeIcon className='checkbox' icon="check-square" />Thursday</th>
      <td>One</td>
      <td>Urdu</td>
      <td>B</td>
      <td>Erin</td>
      <td>01:00-02:00</td>
      <td>15/03/2022</td>
      <td><FontAwesomeIcon icon="fas fa-ellipsis-h" /></td>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default ViewTeacher