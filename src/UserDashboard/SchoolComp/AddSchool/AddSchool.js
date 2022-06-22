import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { createSchool } from "../../../App/Redux/Action/schoolActions";
import ShowToast from "../../../App/Toast";

import "./AddSchool.css";

function AddSchool() {
  const dispatch = useDispatch();
  const { loading, isDialog, msg } = useSelector((state) => state.school);

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [emailValid, setEmailValid] = useState("");

  const validateEmail = (email) => {
    setEmail(email);

    if (validator.isEmail(email) || !email) {
      setEmailValid("");
    } else {
      setEmailValid("Please enter a valid email.");
    }
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
      dispatch(createSchool(name, description, email));
    }
  };

  return (
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
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
             &#160;
            Loading...
          </>
        ) : (
          <>Create School</>
        )}
      </Button>
      <ShowToast show={isDialog} msg={msg} from={"school"}/>
    </Form>
  );
}

export default AddSchool;
