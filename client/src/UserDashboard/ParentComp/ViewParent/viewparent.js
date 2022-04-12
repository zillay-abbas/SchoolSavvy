import React, { useEffect,useState } from 'react';

import { Button, Form, Row, Col, Table, Modal, InputGroup } from "react-bootstrap";

import "./viewparent.css";

const ViewParent = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [Deleteshow, setDeleteShow] = useState(false);

  const DeletehandleClose = () => setDeleteShow(false);
  const DeletehandleShow = () => setDeleteShow(true);

  return (
    <div className="container-visibile">
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Teacher Name</Form.Label>
          <Form.Control
            
            required
            type="text"
            placeholder="Search..."

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row> 
      <Button type="submit">Search</Button>
    </Form>

    <label className='table-lable'>Details</label>

    <Table class="table mt-5 border:1" striped bordered hover>
  <thead >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Phone No</th>
      <th scope="col">Status</th>
      <th scope="col">School Id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo123</td>
      <td>+123456</td>
      <td>Empity</td>
      <td>bs-6</td>
    </tr>
  </tbody>
</Table>
      <Button type="submit" className="ubtn" onClick={handleShow}>Update</Button>
      <Button type="submit" className="dbtn" onClick={DeletehandleShow}>Delete</Button>

      <Modal show={show} onHide={handleClose}
centered
>
        <Modal.Header closeButton>
          <Modal.Title>Update Parent Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Parent Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Teacher Name"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>About Parent</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Description"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Parent Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Update</Button>
    </Form></Modal.Body>
      </Modal>



      <Modal show={Deleteshow} onHide={DeletehandleClose}
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Parent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Delete this Parent Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={DeletehandleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>

    
  )
}

export default ViewParent