import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadNotice,
  updateNotice,
} from "../../../App/Redux/Action/dashboardActions";
import { BiEdit } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { Button, Modal, Spinner } from "react-bootstrap";

import "./NoticeItem.css";
import ShowToast from "../../../App/Toast";

const NoticeItem = () => {
  const dispatch = useDispatch();
  const { loading, notice, isDialog, msg } = useSelector(
    (state) => state.dashboard
  );

  const color = ["blue", "yellow", "green", "red"];

  const [showEdit, setShowEdit] = useState(false);

  const [id, setId] = useState("");
  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");

  const [emptyErr, setEmptyErr] = useState("");

  const onEditClick = (item) => {
    setShowEdit(true);
    setHeading(item?.heading);
    setDesc(item?.description);
    setId(item?.id);
  };

  const handleUpdate = () => {
    if (heading === "" || desc === "") {
      setEmptyErr("Please fill all fields");
    } else {
      dispatch(updateNotice(id, heading, desc));
      setShowEdit(false);
      setId("");
      setDesc("");
      setHeading("");
    }
  };

  useEffect(() => {
    dispatch(loadNotice());
  }, []);

  return (
    <>
      {notice?.map((item, idx) => (
        <div key={item?.id} className="notice_item">
          <div className="notice_itemN">
            <i className={`task_icon notice_ico bg_c_${color[idx]}`}></i>
            <div className="top_title">
              <p className="p_no_m notice_date">{item?.heading}</p>
              <h6 className="h_no_m text-muted notice_desc">
                {item?.description}
              </h6>
            </div>
          </div>
          <div className="edt_btnp">
            <FiEdit3
              className="edt_btnSz"
              onClick={() => {
                onEditClick(item);
              }}
            />
          </div>
        </div>
      ))}

      {/* update notice */}
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setDesc("");
          setHeading("");
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Notice
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
              setShowEdit(false);
              setHeading("");
              setDesc("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
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
              <>Update</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"dashboard"} />
    </>
  );
};

export default NoticeItem;
