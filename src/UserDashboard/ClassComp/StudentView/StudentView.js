import moment from "moment";
import React, { useEffect, useState } from "react";

import { Button, Form, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ShowToast from "../../../App/Toast";
import { BiEditAlt } from "react-icons/bi";
import { BsCloudDownload } from "react-icons/bs";
import {
  addSolutionFile,
  downloadAssignmentFile,
  loadStudentAssignments,
  updateAssignmentSubmission,
} from "../../../App/Redux/Action/classActions";

const StudentView = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.student);
  const {
    assignment: assignments,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.class);

  const [file, setFile] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [emptyFileErr, setEmptyFileErr] = useState("");

  const [assign, setAssign] = useState("");
  const [isUpdate, setisUpdate] = useState(false);

  const onDownloadClick = (path, name) => {
    dispatch(downloadAssignmentFile(path, name));
  };

  const onUploadClick = (assign) => {
    setShowUpload(true);
    setAssign(assign);
    setisUpdate(false);
  };

  const onEditClick = (assign) => {
    setShowUpload(true);
    setAssign(assign);
    setisUpdate(true);
  };

  const handleUpoad = () => {
    if (file === "") {
      setEmptyFileErr("Please choose file");
    } else {
      const data = new FormData();

      if (!isUpdate) {
        data.append("id", assign?.id);
        data.append("file", file);
        data.append("student", current?.school_student?.student_id);

        dispatch(addSolutionFile(data));
      } else {
        data.append("id", assign?.assignment_submission[0]?.id);
        data.append("file", file);

        dispatch(updateAssignmentSubmission(data));
      }

      setFile("");
      setAssign("");
      setShowUpload(false);
    }
  };

  useEffect(() => {
    dispatch(loadStudentAssignments());
  }, []);

  return (
    <>
      {assignments?.length === 0 ? (
        <label className="table-lable">Assignments will appear here</label>
      ) : (
        <>
          <label className="table-lable">Assignment Details</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Subject</th>
                <th scope="col">Due Date</th>
                <th scope="col">Teacher</th>
                <th scope="col">Marks</th>
                <th scope="col">File</th>
                <th scope="col">Upload</th>
              </tr>
            </thead>
            <tbody>
              {assignments?.map((assignment) => (
                <tr>
                  <td>{assignment?.name}</td>
                  <td>{assignment?.school_course?.course_name}</td>
                  <td>
                    {moment(assignment?.duedate)
                      .format("DD/MM/YYYY hh:mm a")}
                  </td>
                  <td>{assignment?.user?.user_name}</td>
                  <td>
                    {assignment?.assignment_submission?.length !==
                      0 && (
                      <small>
                        {assignment?.assignment_submission[0]?.gainmarks} /{" "}
                      </small>
                    )}
                    {assignment?.totalmarks}
                    {(assignment?.assignment_submission[0]?.gainmarks ===
                      null ||
                      assignment?.assignment_submission?.length === 0) && (
                      <small>
                        <i> (Not marked)</i>
                      </small>
                    )}
                  </td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => {
                        onDownloadClick(
                          assignment?.file,
                          assignment?.file_name
                        );
                      }}
                    >
                      Download
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      disabled={moment(new Date()).isAfter(assignment?.duedate) ? true : false}
                      onClick={() => {
                        assignment?.assignment_submission?.length === 0
                          ? onUploadClick(assignment)
                          : onDownloadClick(
                              assignment?.assignment_submission[0]?.file,
                              assignment?.assignment_submission[0]?.file_name
                            );
                      }}
                    >
                      {assignment?.assignment_submission?.length === 0 ? (
                        "Upload"
                      ) : (
                        <BsCloudDownload />
                      )}
                    </Button>

                    {(assignment?.assignment_submission?.length !== 0 &&
                      moment(new Date()).isBefore(assignment?.duedate)) && (
                        <Button
                          type="submit"
                          className="a_LinkHeight"
                          onClick={() => {
                            onEditClick(assignment);
                            setisUpdate(true);
                          }}
                        >
                          <BiEditAlt className="center_icon" />
                        </Button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Upload File */}
      <Modal
        show={showUpload}
        onHide={() => {
          setShowUpload(false);
          setFile("");
          setisUpdate(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="username">
            <h6>Choose File</h6>
          </label>{" "}
          <Form.Control
            required
            type="file"
            placeholder=""
            onChange={(e) => setFile(e.target.files[0])}
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
            {emptyFileErr}
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              setShowUpload(false);
              setisUpdate(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleUpoad}>
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
              <>Upload</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </>
  );
};

export default StudentView;
