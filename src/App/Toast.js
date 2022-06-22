import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hideAttendanceErrorMsg } from "./Redux/Action/attendanceAction";
import { hideClassErrorMsg } from "./Redux/Action/classActions";
import { hideDashboardErrorMsg } from "./Redux/Action/dashboardActions";
import { hideExamErrorMsg } from "./Redux/Action/examActions";
import { hideParentErrorMsg } from "./Redux/Action/parentActions";
import { hidePlanErrorMsg } from "./Redux/Action/planAction";
import { hideSchoolErrorMsg } from "./Redux/Action/schoolActions";
import { hideStudentErrorMsg } from "./Redux/Action/studentActions";
import { hideSubjectErrorMsg } from "./Redux/Action/subjectActions";
import { hideTeacherErrorMsg } from "./Redux/Action/teacherActions";

import "./Toast.css";

const ShowToast = ({ show, msg, from }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    switch (from) {
      case "school":
        dispatch(hideSchoolErrorMsg());
        break;
      case "plan":
        dispatch(hidePlanErrorMsg());
        break;
      case "student":
        dispatch(hideStudentErrorMsg());
        break;
      case "teacher":
        dispatch(hideTeacherErrorMsg());
        break;
      case "class":
        dispatch(hideClassErrorMsg());
        break;
      case "subject":
        dispatch(hideSubjectErrorMsg());
        break;
      case "parent":
        dispatch(hideParentErrorMsg());
        break;
      case "exam":
        dispatch(hideExamErrorMsg());
        break;
      case "attendance":
        dispatch(hideAttendanceErrorMsg());
        break;
      case "dashboard":
        dispatch(hideDashboardErrorMsg());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal_border" closeButton>
          <Modal.Title className="modal_txt_title">{msg}</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default ShowToast;
