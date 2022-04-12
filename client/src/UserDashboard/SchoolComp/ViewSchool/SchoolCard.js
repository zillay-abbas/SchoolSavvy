import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import {
  Accordion,
  Button,
  Modal,
  Form,
  InputGroup,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import "./SchoolCard.css";
import {
  removeSchool,
  updateSchool,
} from "../../../App/Redux/Action/schoolActions";
import ShowToast from "../../../App/Toast";
import { setDashboardSchool } from "../../../App/Redux/Action/dashboardActions";

const SchoolCard = () => {
  const [show, setShow] = useState(false);
  const [schID, setSchID] = useState(0);

  const { all, loading, isDialog, msg } = useSelector((state) => state.school);
  const { school } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [validated, setValidated] = useState(false);
  const [emailValid, setEmailValid] = useState("");

  const validateEmail = (email) => {
    setEmail(email);

    if (validator.isEmail(email) || !email) {
      setEmailValid("");
    } else {
      setEmailValid("Please enter a valid email.");
    }
  };

  const handleClose = () => setShow(false);

  const handleRemove = (schoolID) => {
    dispatch(removeSchool(schoolID));
  };

  const handleActive = (schoolID) => {
    dispatch(setDashboardSchool(schoolID));
  };

  const handleEdit = (schoolID) => {
    setShow(true);
    const school = all.find((school) => school.school_id === schoolID);

    setName(school.school_name);
    setEmail(school.school_email);
    setDescription(school.school_desc);

    setSchID(school.school_id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    if (validator.isEmail(email)) {
      setValidated(true);
      dispatch(updateSchool(schID, name, description, email));
    }
  };

  return (
    <div>
      <Accordion defaultActiveKey="">
        {all?.map((item) => (
          <Accordion.Item eventKey={item.school_id} key={item.school_id}>
            <Accordion.Header>
              {" "}
              <strong className="pad_rig">{item.school_name}</strong>{" "}
              <p className="left_p20">{item.school_desc}</p>{" "}
            </Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button
                  variant="primary"
                  disabled={school?.id === item?.school_id ? true : false}
                  onClick={() => handleActive(item.school_id)}
                >
                  Active
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleRemove(item.school_id)}
                >
                  Remove
                </Button>{" "}
                <Button
                  variant="success"
                  onClick={() => handleEdit(item.school_id)}
                >
                  Edit
                </Button>{" "}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit School</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>School name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="School name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a school name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>School description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a description.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>School email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    required
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                  <span
                    className="invalid-feedback feed_active"
                    style={{
                      fontWeight: "",
                      color: "#DC3545",
                    }}
                  >
                    {emailValid}
                  </span>
                </InputGroup>
              </Form.Group>
            </Row>
            <Button type="submit">
              { loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <> Save Changes </>
              )}
            </Button>
            <ShowToast show={isDialog} msg={msg} from={"school"} />
          </Form>
          
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SchoolCard;
