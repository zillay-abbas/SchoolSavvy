import React, { useEffect, useState } from "react";

import moment from "moment";
import { Button, Table } from "react-bootstrap";
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
  const { all: exams, isDialog, msg } = useSelector((state) => state.exam);
  const { detail } = useSelector((state) => state.user);

  const [isSubmitted, setisSubmitted] = useState(false);

  useEffect(() => {
    dispatch(loadStudentSubmissions());

    exams.forEach((exam) => {
      exam?.exam_schedule.forEach((sched) => {
        if (sched?.exam_submission?.length > 0) {
          setisSubmitted(true);
        }
      });
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
                <th scope="col">Marks</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => {
                return exam?.exam_schedule?.map((sched) => {
                  if (sched?.exam_submission?.length > 0) {
                    return sched?.exam_submission?.map((handedin) => (
                      <tr>
                        <td>{handedin?.school_student?.student_reg_no}</td>
                        <td>{handedin?.school_student?.user?.user_name}</td>
                        <td>
                          {sched?.school_class_room?.cl_name +
                            ` (${sched?.class_section?.section_name})`}
                        </td>
                        <td>{sched?.school_course?.course_name}</td>
                        <td>
                          {handedin?.marks} / {sched?.marks}
                        </td>
                      </tr>
                    ));
                  }
                });
              })}
            </tbody>
          </Table>
        </>
      )}

      <ShowToast show={isDialog} msg={msg} from={"exam"} />
    </>
  );
};

export default Submission;
