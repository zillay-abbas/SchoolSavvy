import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  Table,
  Modal,
  InputGroup,
  Spinner
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeTeacher, updateTeacher } from "../../../App/Redux/Action/teacherActions";
import ShowToast from "../../../App/Toast";

import "./ViewTeacher.css";

const ViewTeacher = () => {
  const dispatch = useDispatch();
  const { all, loading, isDialog, msg } = useSelector((state) => state.teacher);

  const [classErr, setClassErr] = useState("");
  const [validated, setValidated] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [desc, setdesc] = useState("");

  const [searchByName, setSearchByName] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");

  ///////////////////////////////Update record/////////////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleEdit = (teacherId, userId) => {
    setShow(true);
    setId(userId);

    const teacher = all.find(
      (teacher) => teacher?.school_teacher?.teacher_id === teacherId
    );
    console.log(teacher);
    setName(teacher.user_name);
    setEmail(teacher.user_email);
    setdesc(teacher.school_teacher.description);
    setPhone(teacher.school_teacher.teacher_phone);
    setCity(teacher.school_teacher.city);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    setValidated(true);
    dispatch(updateTeacher(id, name, email, password, desc, phone, city));
  };

  //////////////////////////Delete Record////////////////////////////

  const [Deleteshow, setDeleteShow] = useState(false);

  const DeletehandleClose = () => setDeleteShow(false);
  const DeletehandleShow = () => setDeleteShow(true);

  const handleDelete = (userId) => {
    setDeleteShow(true);
    setId(userId);
  };

  const Delete = () => {
    console.log(id);
    dispatch(removeTeacher(id));
    DeletehandleClose();
  };

  useEffect(() => {
    setSearchTeacher(
      all.filter((teacher) => teacher?.user_name === searchByName)
    );
  }, [searchByName]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // dispatch(searchFromState(stdReg));
    setSearchTeacher(
      all.filter((teacher) => teacher?.user_name === searchByName)
    );
  };

  return (
    <div className="container  visibile">
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Search by Student Id</Form.Label>
            <Form.Control
              required
              type="text"
              autoComplete="off"
              placeholder="Search..."
              onChange={(e) => {
                setSearchByName(e.currentTarget.value);
                handleSearch(e);
              }}
            />
          </Form.Group>
        </Row>
        <Button type="submit" disabled={searchByName === "" ? true : false}>
          Search
        </Button>
      </Form>

      <label className="table-lable">Detail </label>

      <Table class="table mt-5 border:1" striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Update Record</th>
          </tr>
        </thead>
        <tbody>
          {searchByName !== "" ? (
            searchTeacher?.length > 0 ? (
              searchTeacher?.map((teacher) => {
                return (
                  <tr>
                    <td>{teacher.user_name}</td>
                    <td>{teacher.user_email}</td>
                    <td>{teacher.school_teacher.teacher_phone}</td>
                    <td>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() =>
                          handleEdit(teacher.school_teacher.teacher_id, teacher.user_id)
                        }
                      >
                        Update
                      </Button>
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => handleDelete(teacher.user_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>No student found</>
            )
          ) : (
            all.map((teacher) => {
              return (
                <tr>
                  <td>{teacher.user_name}</td>
                  <td>{teacher.user_email}</td>
                  <td>{teacher.school_teacher.teacher_phone}</td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() =>
                        handleEdit(teacher.school_teacher.teacher_id, teacher.user_id)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => handleDelete(teacher.user_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      {/* ////////////////////////////Update Model////////////////////////////////// */}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Teacher Name"
                  defaultValue=""
                  value= {name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>About Teacher</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  defaultValue=""
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Teacher Contact</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Contact"
                  defaultValue=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  value = {city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Teacher Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    value= {email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  required
                  value ={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &#160; Loading...
                </>
              ) : (
                <>Update Teacher</>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* /////////////////////////////////Delete Model//////////////////////////////////////// */}

      <Modal show={Deleteshow} onHide={DeletehandleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delet Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Delete this Teacher's Record?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"teacher"} />

    </div>
  );
};

export default ViewTeacher;
