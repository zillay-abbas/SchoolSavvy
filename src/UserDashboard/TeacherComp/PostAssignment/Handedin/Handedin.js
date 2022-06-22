import React, { useState } from "react";
import { Form, Table, Button, Modal, Spinner } from "react-bootstrap";
import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { downloadFile } from "../../../../App/Redux/Action/examActions";
import { assignMarks } from "../../../../App/Redux/Action/classActions";

const Handedin = ({ task }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.teacher);
  const { assignment: assignments } = useSelector((state) => state.class);

  const [showMarks, setShowMarks] = useState(false);
  const [marks, setMarks] = useState("");

  const [assignment, setAssignment] = useState("");

  const [emptyMarksErr, setEmptyMarksErr] = useState("");

  const onAllotClick = (assignment) => {
    setShowMarks(true);
    setAssignment(assignment);
  };

  const onDownloadClick = (assignment) => {
    dispatch(downloadFile(assignment?.file, assignment?.file_name));
  };

  const handleAllot = () => {
    if (marks === "") {
      setEmptyMarksErr("Please enter marks");
    } else {
      dispatch(assignMarks(assignment?.id, marks));
      setMarks("");
      setShowMarks(false);
    }
  };

  return (
    <div>
      <Form.Label>
        {task?.school_class_room?.cl_name} ({task?.class_section?.section_name})
      </Form.Label>
      <Form.Label>&nbsp;&nbsp;Duedate: &nbsp;</Form.Label>
      <Form.Label>
        {moment(task?.duedate).format("MMMM Do YYYY, h:mm a")}
      </Form.Label>
      <Form.Label>&nbsp;&nbsp;Total Marks: &nbsp;</Form.Label>
      <Form.Label>{task?.totalmarks}</Form.Label>

      <Table class="table mt-6 border:1" bordered hover>
        <thead>
          <tr>
            <th scope="col">Reg no.</th>
            <th scope="col">Name</th>
            <th scope="col">File</th>
            <th scope="col">Assign Marks</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assign) => {
            if (assign?.id === task?.id) {
              return assign?.handedIn?.map((item) => (
                <tr>
                  <td>{item?.school_student?.student_reg_no}</td>
                  <td>{item?.school_student?.user?.user_name}</td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => {
                        onDownloadClick(item);
                      }}
                    >
                      Download
                    </Button>
                  </td>
                  <td className="space_btw">
                    {item?.gainmarks === null ? (
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          onAllotClick(item);
                        }}
                      >
                        Allot Marks
                      </Button>
                    ) : (
                      <>
                        {item?.gainmarks}
                        <Button
                          type="submit"
                          className="a_LinkHeight "
                          onClick={() => {
                            onAllotClick(item);
                          }}
                        >
                          <BiEditAlt className="center_icon" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ));
            }
          })}
        </tbody>
      </Table>

      {/* Allot Marks */}
      <Modal
        show={showMarks}
        onHide={() => {
          setShowMarks(false);
          setMarks("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Set Marks
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="username">
            <h6>Enter Marks</h6>
          </label>{" "}
          <input
            type="number"
            min="0"
            max={task?.totalmarks}
            maxlength="2"
            required=""
            value={marks}
            className="form_control"
            autoComplete="off"
            onChange={(e) => {
              setMarks(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <span
            className="invalid-feedback feed_active"
            style={{
              fontWeight: "",
              color: "#DC3545",
            }}
          >
            {emptyMarksErr}
          </span>
          <Button variant="secondary" onClick={() => setShowMarks(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAllot}>
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
              <>Allot</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Handedin;
