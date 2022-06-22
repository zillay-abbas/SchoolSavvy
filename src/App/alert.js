import React from "react";
import { Modal } from "react-bootstrap";

import "./Toast.css";

const ShowToast = ({ show, msg, setShow }) => {
  return (
    <>
      <Modal show={show} onHide={setShow}>
        <Modal.Header className="modal_border" closeButton>
          <Modal.Title className="modal_txt_title">{msg}</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default ShowToast;
