import React from 'react'
import { Button, Form, Row, Col, InputGroup , Table } from "react-bootstrap";

import "./StudentPostAssignment.css"
const StudentPostAssignment = () => {
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

          <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Button type="submit" className="a_select-button">Choose File</Button>
        </Form.Group>

       </Row>

      <Button type="submit">Upload</Button>

    </Form>
   
        </div>
  )
}

export default StudentPostAssignment