import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Modal,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSchoolClasses } from "../../../App/Redux/Action/classActions";
import { addParent } from "../../../App/Redux/Action/parentActions";
import ShowToast from "../../../App/Toast";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";

import "./Addparent.css";
import { loadSchoolStudents } from "../../../App/Redux/Action/studentActions";
import { isAllOf } from "@reduxjs/toolkit";

function FormExample() {
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.class);
  const { all: students } = useSelector((state) => state.student);
  const { loading, isDialog, msg, error } = useSelector(
    (state) => state.parent
  );

  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [std, setStd] = useState("");
  const [stdArray, setStdArray] = useState([]);

  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    dispatch(addParent(name, email, password, phone, stdArray));
    dispatch(loadSchoolStudents());
  };

  useEffect(() => {
    if (!error) {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setGrade("");
      setSection("");
      setStd("");
      setStdArray([]);
    }
  }, [error]);

  const addToArray = () => {
    setStdArray((oldArray) => [...oldArray, std]);
    setShow(false);
    setGrade("");
    setSection("");
    setStd("");
  };

  const removeFromArray = (id) => {
    setStdArray((oldArray) => oldArray.filter((std) => std?.user_id !== id));
  };

  useEffect(() => {
    dispatch(loadSchoolClasses());
  }, []);

  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <>
      <Form noValidate>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Parent/Guardian Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Parent name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Contact No</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            as={Col}
            md="4"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a email.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Choose Student (As child)</Form.Label>
            <Button
              className="align_center"
              variant="secondary"
              onClick={() => setShow(true)}
            >
              <GrAdd className="svg_white" />
              &nbsp; Choose &nbsp;{" "}
            </Button>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Added Student</Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <DropdownButton
                as={ButtonGroup}
                title={
                  stdArray.length === 0
                    ? "No student exist (as child)"
                    : `${stdArray.length} ${
                        stdArray.length === 1 ? "student" : "students"
                      } (child) `
                }
                variant="secondary"
                id="bg-nested-dropdown"
              >
                {stdArray.map((std) => (
                  <Dropdown.Item eventKey={std?.class_id} onClick={() => {}}>
                    <span
                      className="remove_std"
                      onClick={() => removeFromArray(std?.user_id)}
                    >
                      <AiOutlineMinus className="svg_white mar_btm" />
                    </span>
                    {` (${std?.school_student?.student_reg_no}) ${std?.user_name}`}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
          </Form.Group>
        </Row>
        <Button onClick={handleSubmit}>Add Parent</Button>
      </Form>

      {/* Create/Update Modal */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Child Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Choose Student (As child)</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <ButtonGroup>
              <DropdownButton
                as={ButtonGroup}
                title={grade === "" ? "From Class " : grade?.cl_name + " "}
                variant="secondary"
                id="bg-nested-dropdown"
              >
                {all.map((grade) => (
                  <Dropdown.Item
                    eventKey={grade?.class_id}
                    onClick={() => {
                      setGrade(grade);
                    }}
                  >
                    {grade?.cl_name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <DropdownButton
                as={ButtonGroup}
                title={
                  section === "" ? "Section " : section?.section_name + " "
                }
                variant="secondary"
                id="bg-nested-dropdown"
              >
                {grade?.class_section?.map((section) => (
                  <Dropdown.Item
                    eventKey={section?.section_id}
                    onClick={() => {
                      setSection(section);
                    }}
                  >
                    {section?.section_name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle
                  as={ButtonGroup}
                  variant="secondary"
                  id="bg-nested-dropdown"
                  className="dorpdown_btn"
                >
                  {std === "" ? "Students" : std?.user_name} &nbsp;
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                  {students.map((student) => {
                    if (
                      student?.school_student?.school_class_room?.class_id ===
                        grade?.class_id &&
                      student?.school_student?.class_section?.section_id ===
                        section?.section_id &&
                      student?.school_student?.student_parent_id === null
                    ) {
                      if (stdArray.length === 0) {
                        return (
                          <Dropdown.Item
                            eventKey={student?.user_id}
                            onClick={() => {
                              setStd(student);
                            }}
                          >{`${student?.user_name}(${student?.school_student?.student_reg_no}) `}</Dropdown.Item>
                        );
                      } else {
                        return stdArray.map((item) => {
                          if (item?.user_id !== student?.user_id) {
                            return (
                              <Dropdown.Item
                                eventKey={student?.user_id}
                                onClick={() => {
                                  setStd(student);
                                }}
                              >{`${student?.user_name}(${student?.school_student?.student_reg_no}) `}</Dropdown.Item>
                            );
                          }
                        });
                      }
                    }
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addToArray}>Select</Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"parent"} />
    </>
  );
}

// render(<FormExample />);
export default FormExample;
