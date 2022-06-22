import React, { useEffect, useState } from "react";

import moment from "moment";
import { Button, Table, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addObtMarks,
  downloadFile,
  loadStudentSubmissions,
} from "../../../App/Redux/Action/examActions";
import ShowToast from "../../../App/Toast";
import { BiEditAlt } from "react-icons/bi";
import * as role from "../../../App//Redux/Constant/userConstant";

const Submission = () => {
  const dispatch = useDispatch();
  const {
    all: exams,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.exam);
  const { detail } = useSelector((state) => state.user);

  const [marks, setMarks] = useState("");

  const [showMarks, setShowMarks] = useState(false);
  const [handedin, sethandedin] = useState("");

  const [emptyMarksErr, setEmptyMarksErr] = useState("");

  const [isSubmitted, setisSubmitted] = useState(false);

  const onAllotClick = (assigned) => {
    sethandedin(assigned);
    setShowMarks(true);
  };

  const onDownloadClick = (filePath, fileName) => {
    dispatch(downloadFile(filePath, fileName));
  };

  const handleAllot = () => {
    if (marks === "") {
      setEmptyMarksErr("Please enter marks");
    } else {
      dispatch(addObtMarks(handedin?.id, marks));
      setMarks("");
      setShowMarks(false);
    }
  };

  useEffect(() => {
    if (detail.role === role.ADMIN) {
      dispatch(loadStudentSubmissions());
    }

    exams.forEach((exam) => {
      if (exam?.exam_submission?.length > 0) {
        setisSubmitted(true);
      }
    });
  }, []);

  return (
    <>
      {!isSubmitted || exams.length === 0 ? (
        <label className="table-lable">
          Student submissions will appear here
        </label>
      ) : (
        <>
          <label className="table-lable">Submission Detail</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Reg No.</th>
                <th scope="col">Student Name</th>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Uploading Time</th>
                <th scope="col">Answer File</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
                if (exam?.exam_submission?.length > 0) {
                  return exam?.exam_submission?.map((handedin) => (
                    <tr>
                      <td>{handedin?.school_student?.student_reg_no}</td>
                      <td>{handedin?.school_student?.user?.user_name}</td>
                      <td>
                        {exam?.school_class_room?.cl_name +
                          ` (${exam?.class_section?.section_name})`}
                      </td>
                      <td>{exam?.school_course?.course_name}</td>
                      <td>{moment(exam?.date).format("DD-MM-YYYY")}</td>
                      <td>
                        {moment.utc(exam?.start_time).format("hh:mm a")} to{" "}
                        {moment.utc(exam?.end_time).format("hh:mm a")}
                      </td>
                      <td>
                        {moment(handedin?.submit_time).format(
                          "DD-MM-YYYY hh:mm a"
                        )}
                      </td>
                      <td>
                        <Button
                          type="submit"
                          className="a_LinkHeight"
                          onClick={() => {
                            onDownloadClick(
                              handedin?.file,
                              handedin?.file_name
                            );
                          }}
                        >
                          Download
                        </Button>
                      </td>
                      <td className="space_btw">
                        {handedin?.marks === null ? (
                          <Button
                            type="submit"
                            className="a_LinkHeight"
                            onClick={() => {
                              onAllotClick(handedin);
                            }}
                          >
                            Allot Marks
                          </Button>
                        ) : (
                          <>
                            {handedin?.marks} /{exam?.marks}
                            <Button
                              type="submit"
                              className="a_LinkHeight "
                              onClick={() => {
                                onAllotClick(handedin);
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

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </>
  );
};

export default Submission;
