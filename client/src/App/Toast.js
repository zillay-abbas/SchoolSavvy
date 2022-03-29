import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hidePlanErrorMsg } from "./Redux/Action/planAction";
import { hideSchoolErrorMsg } from "./Redux/Action/schoolActions";

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
      case "user":
        break;
      case "dashboard":
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
