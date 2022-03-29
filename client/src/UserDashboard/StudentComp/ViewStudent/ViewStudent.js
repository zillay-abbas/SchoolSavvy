<<<<<<< HEAD
import React, {useState } from 'react';

import { Button, Form, Row, Col, Table ,Modal,InputGroup } from "react-bootstrap";
=======
import React, { useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c

import "./ViewStudent.css";

const ViewStudent = () => {
<<<<<<< HEAD

   ///////////////////////////////Update record/////////////////////////////////

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //////////////////////////Delete Record////////////////////////////
  
    const [Deleteshow, setDeleteShow] = useState(false);
  
    const DeletehandleClose = () => setDeleteShow(false);
    const DeletehandleShow = () => setDeleteShow(true);

  return (
    <div className="container visibile">
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Student Id</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Search..."

          />
        </Form.Group>
        
      </Row> 
      <Button type="submit">Search</Button>
    </Form>

    <label className='table-lable'>Detail </label>

    <Table className='table mt-4' striped bordered hover>
  <thead >
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Date of Birth</th>
      <th scope="col">Join Date</th>
      <th scope="col">Update Record</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ali</td>
      <td>@Ali</td>
      <td>@Ali123</td>
      <td>DOB</td>
      <td>Join Date</td> 
      <td>       
      <Button type="submit" className='a_LinkHeight' onClick={handleShow}>Update</Button>
      <Button type="submit" className='a_LinkHeight' onClick={DeletehandleShow}>Delete</Button>

      </td>
    </tr>
  </tbody>
</Table>

{/* ////////////////////////////Update Model////////////////////////////////// */}




<Modal show={show} onHide={handleClose}
centered
>
=======
  ///////////////////////////////Update record/////////////////////////////////

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////////////////////Delete Record////////////////////////////

  const [Deleteshow, setDeleteShow] = useState(false);

  const DeletehandleClose = () => setDeleteShow(false);
  const DeletehandleShow = () => setDeleteShow(true);

  return (
    <div className="container visibile">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Student Id</Form.Label>
            <Form.Control required type="number" placeholder="Search..." />
          </Form.Group>
        </Row>
        <Button type="submit">Search</Button>
      </Form>

      <label className="table-lable">Detail </label>

      <Table className="table mt-4" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Join Date</th>
            <th scope="col">Update Record</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ali</td>
            <td>@Ali</td>
            <td>@Ali123</td>
            <td>DOB</td>
            <td>Join Date</td>
            <td>
              <Button
                type="submit"
                className="a_LinkHeight"
                onClick={handleShow}
              >
                Update
              </Button>
              <Button
                type="submit"
                className="a_LinkHeight"
                onClick={DeletehandleShow}
              >
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* ////////////////////////////Update Model////////////////////////////////// */}

      <Modal show={show} onHide={handleClose} centered>
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<<<<<<< HEAD
        <Form>
      <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Student Name"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Student DOB</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder=""
            
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label> Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Useremail"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        </Row>
        <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="validationCustomUserPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Correct Password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      
      
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Join Date</Form.Label>
          <Form.Control
              type="date"
              placeholder="Enter Date"
              aria-describedby="inputGroupPrepend"
              required
            />
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
      <Button type="submit">Add Student</Button>
    </Form>
    </Modal.Body>
      </Modal>



      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}


      <Modal show={Deleteshow} onHide={DeletehandleClose}
      centered>
=======
          <Form>
            <Row className="mb-4">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Student Name"
                  defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Student DOB</Form.Label>
                <Form.Control required type="date" placeholder="" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label> Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Useremail"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationCustomUserPassword"
              >
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter Correct Password.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Join Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date"
                  aria-describedby="inputGroupPrepend"
                  required
                />
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
            <Button type="submit">Add Student</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}

      <Modal show={Deleteshow} onHide={DeletehandleClose} centered>
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
        <Modal.Header closeButton>
          <Modal.Title>Delet Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Delete this Student's Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={DeletehandleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD


    </div>
  )
}

export default ViewStudent
=======
    </div>
  );
};

export default ViewStudent;
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
