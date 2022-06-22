import moment from "moment";
import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Table,
  InputGroup,
  DropdownButton,
  Col,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadParentExams } from "../../../App/Redux/Action/examActions";
import ShowToast from "../../../App/Toast";
import generatePDF from "../../../App/services/reportGenerator";

const TeacherView = () => {
  const dispatch = useDispatch();
  const { all: exams, isDialog, msg } = useSelector((state) => state.exam);
  const { all: students } = useSelector((state) => state.student);
  const { school } = useSelector((state) => state.dashboard);

  const [selectedStd, setselectedStd] = useState("");

  const handleReport = () => {
    if (exams.length > 0) {
      generatePDF(exams, school);
    }
  };

  const onStudentClick = (std) => {
    dispatch(loadParentExams(std?.student_id));

    setselectedStd(std);
  };

  return (
    <>
      <Form.Label>Choose student to check result</Form.Label>
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <InputGroup className="mb-3" hasValidation>
          <DropdownButton
            variant="outline-secondary"
            title={
              selectedStd?.user?.user_name
                ? selectedStd?.user?.user_name
                : "Choose"
            }
            id="input-group-dropdown-1"
          >
            {students.map((std) => {
              return (
                <Dropdown.Item
                  eventKey={std.student_id}
                  onClick={() => {
                    onStudentClick(std);
                  }}
                >
                  {std?.user?.user_name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </InputGroup>
        <Button
          disabled={selectedStd === "" ? true : false}
          variant="primary"
          onClick={handleReport}
        >
          Get Report
        </Button>
      </Form.Group>

      {exams.length === 0 ? (
        <label className="table-lable">Student result will appear here</label>
      ) : (
        <>
          <label className="table-lable">Exams Result</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Exam</th>
                <th scope="col">Subject</th>
                <th scope="col">Class</th>
                <th scope="col">Date</th>
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr>
                  <td>{exam?.school_student?.user?.user_name}</td>
                  <td>
                    {
                      exam?.exam_schedule_exam_scheduleToexam_submission
                        ?.school_exam?.exam_name
                    }
                  </td>
                  <td>
                    {
                      exam?.exam_schedule_exam_scheduleToexam_submission
                        ?.school_course?.course_name
                    }
                  </td>
                  <td>
                    {exam?.exam_schedule_exam_scheduleToexam_submission
                      ?.school_class_room?.cl_name +
                      ` (${exam?.exam_schedule_exam_scheduleToexam_submission?.class_section?.section_name})`}
                  </td>
                  <td>{moment(exam?.date).format("DD-MM-YYYY")}</td>
                  <td className="space_btw">
                    {exam?.marks === null ? (
                      <small>
                        <i>(Not Marked)</i>
                      </small>
                    ) : (
                      <>
                        {exam?.marks} /{" "}
                        {
                          exam?.exam_schedule_exam_scheduleToexam_submission
                            ?.marks
                        }
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </>
  );
};

export default TeacherView;
