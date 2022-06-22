import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createClassLink,
  loadTeacherTimeTable,
} from "../../../App/Redux/Action/classActions";
import { loadNotice } from "../../../App/Redux/Action/dashboardActions";
import moment from "moment";

import ShowToast from "../../../App/Toast";

import "./TeacherSchedule.css";

const TeacherSchedule = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.teacher);
  const { schedule, isDialog, msg, loading, startUrl } = useSelector(
    (state) => state.class
  );

  const [show, setShow] = useState(false);

  const [slotId, setSlotId] = useState("");

  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (timeSlot) => {
    console.log(timeSlot);
    console.log(`asfds ${timeSlot}`);
    setSlotId(timeSlot?.timetable_id);
    setShow(true);
  };

  const handleCreateLink = () => {
    dispatch(createClassLink(topic, duration, slotId));
  };

  useEffect(() => {
    dispatch(loadTeacherTimeTable(current?.user_id));
    dispatch(loadNotice());
  }, []);

  return (
    <div className="container ">
      <Table class="table mt-6 border:1" bordered hover>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Class</th>
            <th scope="col">Class Section</th>
            <th scope="col">Class Time</th>
            <th scope="col">Classroom Link</th>
          </tr>
        </thead>
        <tbody>
          {schedule?.map((timeSlot) => (
            <tr>
              <th scope="row">{timeSlot?.tt_day}</th>
              <td>{timeSlot?.school_class_room?.cl_name}</td>
              <td>{timeSlot?.class_section?.section_name}</td>
              <td>
                {moment.utc(timeSlot?.tt_time_start).format("hh:mm a") +
                  " - " +
                  moment.utc(timeSlot?.tt_time_end).format("hh:mm a")}
              </td>
              <td>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  disabled={
                    parseInt(timeSlot?.tt_time_start.slice(11, 13)) ===
                      new Date().getHours() &&
                    parseInt(timeSlot?.tt_time_end.slice(11, 13)) ===
                      new Date().getHours()
                      ? new Date(timeSlot?.tt_time_start).getMinutes() <=
                          new Date().getMinutes() &&
                        new Date(timeSlot?.tt_time_end).getMinutes() >=
                          new Date().getMinutes()
                        ? false
                        : true
                      : parseInt(timeSlot?.tt_time_start.slice(11, 13)) ===
                        new Date().getHours()
                      ? new Date(timeSlot?.tt_time_start).getMinutes() <=
                        new Date().getMinutes()
                        ? false
                        : true
                      : parseInt(timeSlot?.tt_time_end.slice(11, 13)) ===
                        new Date().getHours()
                      ? new Date(timeSlot?.tt_time_end).getMinutes() >=
                        new Date().getMinutes()
                        ? false
                        : true
                      : parseInt(timeSlot?.tt_time_end.slice(11, 13)) >
                          new Date().getHours() &&
                        parseInt(timeSlot?.tt_time_start.slice(11, 13)) <
                          new Date().getHours()
                      ? false
                      : true
                  }
                  onClick={() => handleShow(timeSlot)}
                >
                  Create Class
                </Button>
                <Button
                  type="submit"
                  className="a_LinkHeight"
                  disabled={timeSlot?.tt_class_link ? false : true}
                  onClick={() => {
                    openInNewTab(timeSlot?.tt_class_link);
                  }}
                >
                  Join Class
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Class Link
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="username">
            <h6>Meeting Topic</h6>
          </label>{" "}
          <input
            type="text"
            placeholder="Topic"
            required=""
            className="form_control"
            autoComplete="off"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <label for="username">
            <h6>Meeting Duration</h6>
          </label>{" "}
          <input
            type="number"
            min="0"
            max="59"
            maxlength="2"
            required=""
            value={duration}
            className="form_control"
            autoComplete="off"
            onChange={(e) => {
              if (e.target.value <= 60) {
                setDuration(e.target.value);
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          {startUrl && (
            <a href={startUrl} target="_blank">
              <Button variant="success" onClick={handleClose}>
                Start Meeting
              </Button>
            </a>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateLink}>
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
              <>Create</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <ShowToast show={isDialog} msg={msg} from={"class"} />
    </div>
  );
};

export default TeacherSchedule;
