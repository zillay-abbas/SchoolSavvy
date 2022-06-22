import moment from "moment";
import React, { useEffect, useState } from "react";

import { Button, Form, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestionFile,
  addTotalMarks,
  downloadFile,
  loadTeacherExams,
} from "../../../App/Redux/Action/examActions";
import ShowToast from "../../../App/Toast";
import { BiEditAlt } from "react-icons/bi";

import "./AddMidExam.css";

const TeacherView = () => {
  const dispatch = useDispatch();
  const {
    all: exams,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.exam);

  const [showMarks, setShowMarks] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [exam, setExam] = useState("");
  const [marks, setMarks] = useState("");
  const [file, setFile] = useState("");

  const [emptyMarksErr, setEmptyMarksErr] = useState("");
  const [emptyFileErr, setEmptyFileErr] = useState("");

  const onDownloadClick = (exam) => {
    dispatch(downloadFile(exam?.file_path, exam?.file_name));
  };

  const onUploadClick = (exam) => {
    setShowUpload(true);
    setExam(exam);
  };

  const onAllotClick = (exam) => {
    setShowMarks(true);
    setExam(exam);
  };

  const handleUpoad = () => {
    if (file === "") {
      setEmptyFileErr("Please choose file");
    } else {
      const data = new FormData();
      data.append("id", exam?.id);
      data.append("file", file);

      dispatch(addQuestionFile(data));

      setExam("");
      setFile("");
      setShowUpload(false);
    }
  };

  const handleAllot = () => {
    if (marks === "") {
      setEmptyMarksErr("Please enter marks");
    } else {
      dispatch(addTotalMarks(exam?.id, marks));
      setMarks("");
      setExam("");
      setShowMarks(false);
    }
  };

  useEffect(() => {
    dispatch(loadTeacherExams());
  }, []);

  return (
    <>
      {exams.length === 0 ? (
        <label className="table-lable">Exams will appear here</label>
      ) : (
        <>
          <label className="table-lable">Exams Detail</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Exam</th>
                <th scope="col">Subject</th>
                <th scope="col">Class</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Marks</th>
                <th scope="col">File</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr>
                  <td>{exam?.school_exam?.exam_name}</td>
                  <td>{exam?.school_course?.course_name}</td>
                  <td>
                    {exam?.school_class_room?.cl_name +
                      ` (${exam?.class_section?.section_name})`}
                  </td>
                  <td>{moment(exam?.date).format("DD-MM-YYYY")}</td>
                  <td>
                    {moment.utc(exam?.start_time).format("hh:mm a")} to{" "}
                    {moment.utc(exam?.end_time).format("hh:mm a")}
                  </td>
                  <td className="space_btw">
                    {exam?.marks === null ? (
                      <Button
                        type="submit"
                        className="a_LinkHeight"
                        onClick={() => {
                          onAllotClick(exam);
                        }}
                      >
                        Allot Marks
                      </Button>
                    ) : (
                      <>
                        {exam?.marks}
                        <Button
                          type="submit"
                          className="a_LinkHeight "
                          onClick={() => {
                            onAllotClick(exam);
                          }}
                        >
                          <BiEditAlt className="center_icon" />
                        </Button>
                      </>
                    )}
                  </td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => {
                        exam?.file_path === null
                          ? onUploadClick(exam)
                          : onDownloadClick(exam);
                      }}
                    >
                      {exam?.file_path === null ? "Upload" : "Download"}
                    </Button>

                    {exam?.file_path !== null && (
                      <Button
                        type="submit"
                        className="a_LinkHeight "
                        onClick={() => {
                          onUploadClick(exam);
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
            max="100"
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

      {/* Upload File */}
      <Modal
        show={showUpload}
        onHide={() => {
          setShowUpload(false);
          setFile("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Question Paper
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
          <Button variant="secondary" onClick={() => setShowUpload(false)}>
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

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </>
  );
};

export default TeacherView;
