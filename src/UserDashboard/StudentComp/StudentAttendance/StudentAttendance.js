import React from "react";
import { Button, Form, Row, Col, Table } from "react-bootstrap";

const StudentAttendance = () => {
  return (
    <div className="container">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Search by Date</Form.Label>
            <Form.Control required type="text" placeholder="" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Search</Button>
      </Form>

      <label className="table-lable">Detail </label>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>10-04-2022</td>
            <td>P</td>
          </tr>
          <tr>
            <td>Tuesdat</td>
            <td>11-04-2022</td>
            <td>P</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>12-04-2022</td>
            <td>A</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default StudentAttendance;
