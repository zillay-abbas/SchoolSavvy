import moment from "moment";
import React, { useEffect, useState } from "react";

import { Button, Form, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswerFile,
  downloadFile,
  loadStudentExams,
} from "../../../App/Redux/Action/examActions";
import ShowToast from "../../../App/Toast";
import { BsCloudDownload } from "react-icons/bs";

const StudentView = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.student);
  const {
    all: exams,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.exam);

  const [file, setFile] = useState("");

  const [showUpload, setShowUpload] = useState(false);
  const [emptyFileErr, setEmptyFileErr] = useState("");

  const [exam, setExam] = useState("");

  const onDownloadClick = (path, name) => {
    dispatch(downloadFile(path, name));
  };

  const onUploadClick = (exam) => {
    setShowUpload(true);
    setExam(exam);
  };

  const handleUpoad = () => {
    if (file === "") {
      setEmptyFileErr("Please choose file");
    } else {
      const data = new FormData();

      data.append("schId", exam?.id);
      data.append("file", file);
      data.append("student", current?.school_student?.student_id);

      dispatch(addAnswerFile(data));

      setFile("");
      setExam("");
      setShowUpload(false);
    }
  };

  useEffect(() => {
    dispatch(loadStudentExams());
  }, []);

  return (
    <>
      {exams?.length === 0 ? (
        <label className="table-lable">Exams will appear here</label>
      ) : (
        <>
          <label className="table-lable">Exam Detail</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Exam</th>
                <th scope="col">Teacher</th>
                <th scope="col">Subject</th>
                <th scope="col">Marks</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">File</th>
                <th scope="col">Upload</th>
              </tr>
            </thead>
            <tbody>
              {exams?.map((exam) => (
                <tr>
                  <td>{exam?.school_exam?.exam_name}</td>
                  <td>{exam?.school_teacher?.user?.user_name}</td>
                  <td>{exam?.school_course?.course_name}</td>
                  <td>
                    {exam?.exam_submission[0]?.marks !== null &&
                      exam?.exam_submission?.length !== 0 && (
                        <small>
                          {exam?.exam_submission[0]?.marks} / {exam?.marks}
                        </small>
                      )}

                    {exam?.marks === null ? (
                      <small>
                        <i> (Not Alloted)</i>
                      </small>
                    ) : (
                      <>
                        {(exam?.exam_submission[0]?.marks === null ||
                          exam?.exam_submission?.length === 0) && (
                          <small>
                            <i> (Not marked)</i>
                          </small>
                        )}
                      </>
                    )}
                  </td>

                  <td>{moment.utc(exam?.date).format("DD/MM/YYYY")}</td>

                  <td>
                    {moment.utc(exam?.start_time).format("hh:mm a")} -{" "}
                    {moment.utc(exam?.end_time).format("hh:mm a")}
                  </td>

                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      disabled={
                        exam?.file_path === null
                          ? true
                          : moment.utc(exam?.date).format("DD/MM/YYYY") ===
                            moment.utc().format("DD/MM/YYYY")
                          ? moment.utc(exam?.start_time).isBefore(moment()) &&
                            moment.utc(exam?.end_time).isAfter(moment())
                            ? false
                            : true
                          : true
                      }
                      onClick={() => {
                        onDownloadClick(exam?.file_path, exam?.file_name);
                      }}
                    >
                      Download
                    </Button>
                  </td>

                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      disabled={
                        exam?.file_path === null
                          ? true
                          : moment.utc(exam?.date).format("DD/MM/YYYY") ===
                            moment.utc().format("DD/MM/YYYY")
                          ? moment.utc(exam?.start_time).isBefore(moment()) &&
                            moment.utc(exam?.end_time).isAfter(moment())
                            ? false
                            : true
                          : true
                      }
                      onClick={() => {
                        exam?.exam_submission?.length === 0
                          ? onUploadClick(exam)
                          : onDownloadClick(
                              exam?.exam_submission[0]?.file,
                              exam?.exam_submission[0]?.file_name
                            );
                      }}
                    >
                      {exam?.exam_submission?.length === 0 ? (
                        "Upload"
                      ) : (
                        <BsCloudDownload />
                      )}
                    </Button>
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
          setExam("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Solution
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

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </>
  );
};

export default StudentView;
