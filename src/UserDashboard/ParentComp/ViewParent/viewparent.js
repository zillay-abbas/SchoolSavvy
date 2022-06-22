import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  InputGroup,
} from "react-bootstrap";
import ShowToast from "../../../App/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loadParents,
  removeParent,
  updateParent,
} from "../../../App/Redux/Action/parentActions";

import "./viewparent.css";
import { loadSchoolStudents } from "../../../App/Redux/Action/studentActions";

const ViewParent = () => {
  const dispatch = useDispatch();
  const { all, loading, isDialog, msg } = useSelector((state) => state.parent);

  const [show, setShow] = useState(false);
  const [Deleteshow, setDeleteShow] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchByName, setSearchByName] = useState("");
  const [searchParent, setSearchParent] = useState("");
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const DeletehandleClose = () => setDeleteShow(false);

  const handleUpdateShow = (parent) => {
    handleShow();
    setId(parent?.user_id);
    setName(parent?.user_name);
    setContact(parent?.school_parent?.parent_phone);
    setEmail(parent?.user_email);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }
    setValidated(true);
    dispatch(updateParent(id, name, contact, email, password));
    setShow(false);
  };

  const handleDelete = () => {
    dispatch(removeParent(id));
    dispatch(loadSchoolStudents());
  };

  useEffect(() => {
    setSearchParent(
      all.filter((teacher) =>
        teacher?.user_name.toLowerCase().startsWith(searchByName)
      )
    );
  }, [searchByName]);

  useEffect(() => {
    dispatch(loadParents());
  }, []);

  return (
    <div className="container-visibile">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Parent Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => {
                setSearchByName(e.currentTarget.value);
              }}
              placeholder="Search..."
            />
          </Form.Group>
        </Row>
        <Button type="submit" disabled={searchByName === "" ? true : false}>Search</Button>
      </Form>

      <label className="table-lable">Details</label>

      <Table class="table mt-5 border:1" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No</th>
            <th scope="col">Update or Delete</th>
          </tr>
        </thead>
        <tbody>
          {searchByName !== "" ? (
            searchParent?.length > 0 ? (
              searchParent?.map((parent) => {
                return (
                  <tr>
                    <td>{parent?.user_name}</td>
                    <td>{parent?.user_email}</td>
                    <td>{parent?.school_parent?.parent_phone}</td>
                    <td>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          handleUpdateShow(parent);
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          setDeleteShow(true);
                          setId(parent?.user_id);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>No parent found</>
            )
          ) : (
            all.map((parent) => (
              <tr>
                <td>{parent?.user_name}</td>
                <td>{parent?.user_email}</td>
                <td>{parent?.school_parent?.parent_phone}</td>
                <td>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => {
                      handleUpdateShow(parent);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    type="submit"
                    className="a_LinkHeight"
                    onClick={() => {
                      setDeleteShow(true);
                      setId(parent?.user_id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Parent Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Parent Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue=""
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Phone No."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  defaultValue=""
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Button type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={Deleteshow} onHide={DeletehandleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Parent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Delete this Parent Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"parent"} />
    </div>
  );
};

export default ViewParent;
