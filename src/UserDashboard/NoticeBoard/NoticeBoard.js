import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Spinner } from "react-bootstrap";

import NoticeItem from "./NoticeItem/NoticeItem";
import { CgAddR } from "react-icons/cg";

import "./NoticeBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { addNotice, loadNotice } from "../../App/Redux/Action/dashboardActions";
import ShowToast from "../../App/Toast";

const NoticeBoard = () => {
  const { loading, isDialog, msg } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [showAdd, setshowAdd] = useState(false);
  const [emptyErr, setEmptyErr] = useState("");

  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");

  const onAddNoticeClick = () => {
    setshowAdd(true);
  };

  const handleAdd = () => {
    if (heading === "" || desc === "") {
      setEmptyErr("Please fill all fields");
    } else {
      dispatch(addNotice(heading, desc)); 
    }
  };

  return (
    <div className="notice_card">
      <div className="notice_head">
        <h5 className="h5_no_m">Notice</h5>
        <CgAddR className="add_btnSz" onClick={onAddNoticeClick} />
      </div>

      <div className="notice_detail">
        <div className="notice_top">
          <FontAwesomeIcon
            className="text_c_yellow f_20 mx-1"
            icon="fa-solid fa-certificate"
          />
          <h6 className="text_muted f_15 h_no_m mx-3">
            Welcome to SchoolSavvy!
          </h6>
        </div>
        <div className="notice_border_line"></div>
        <NoticeItem />
      </div>

      {/* Add notice */}
      <Modal
        show={showAdd}
        onHide={() => {
          setshowAdd(false);
          setHeading("");
          setDesc("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Notice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="username">
            <h6>Heading</h6>
          </label>{" "}
          <input
            type="text"
            className="form_control"
            autoComplete="off"
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            value={heading}
            required
          />
          <label for="username">
            <h6>Description</h6>
          </label>{" "}
          <input
            type="text"
            className="form_control"
            autoComplete="off"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            value={desc}
            required
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
            {emptyErr}
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              setshowAdd(false);
              setHeading("");
              setDesc("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
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
              <>Add</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"dashboard"} />

    </div>
  );
};

export default NoticeBoard;
