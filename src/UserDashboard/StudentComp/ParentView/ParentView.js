import moment from "moment";
import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Accordion,
  Badge,
  Table,
  Modal,
  Spinner,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ShowToast from "../../../App/Toast";

import { loadParentStudents } from "../../../App/Redux/Action/studentActions";
import { loadClassSecSchedule } from "../../../App/Redux/Action/classActions";
import { loadNotice } from "../../../App/Redux/Action/dashboardActions";

const ParentView = () => {
  const dispatch = useDispatch();
  const {
    all: students,
    isDialog,
    msg,
    loading,
  } = useSelector((state) => state.student);

  const { schedule } = useSelector((state) => state.class);

  const [showDetail, setShowDetail] = useState(false);
  const [std, setStd] = useState(false);

  const onDetailClick = (std) => {
   
    dispatch(
      loadClassSecSchedule(
        std?.school_class_room?.class_id,
        std?.class_section?.section_id
      )
    );
    setShowDetail(true);
  };

  useEffect(() => {
    dispatch(loadParentStudents());
    dispatch(loadNotice());
  }, []);

  return (
    <>
      {students.length === 0 ? (
        <label className="table-lable">
          Your child detail will appear here
        </label>
      ) : (
        <>
          <label className="table-lable">Child Detail</label>
          <Table class="table mt-6 border:1" bordered hover>
            <thead>
              <tr>
                <th scope="col">Reg No.</th>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => (
                <tr>
                  <td>{std?.student_reg_no}</td>
                  <td>{std?.user?.user_name}</td>
                  <td>
                    {std?.school_class_room?.cl_name +
                      " (" +
                      std?.class_section?.section_name +
                      ")"}
                  </td>
                  <td>
                    <Button
                      type="submit"
                      className="a_LinkHeight"
                      onClick={() => {
                        onDetailClick(std);
                      }}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Show Details */}
      <Modal
        show={showDetail}
        onHide={() => {
          setShowDetail(false);
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Class Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {schedule.length === 0 ? (
            <label className="table-lable">
              Student class and teacher detail will appear here
            </label>
          ) : (
            <>
              <Table class="table mt-6 border:1" bordered hover>
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Time</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((schedule) => (
                    <tr>
                      <td>{schedule?.tt_day}</td>
                      <td>
                        {moment
                          .utc(schedule?.tt_time_start)
                          .format("mm : hh a")}{" "}
                        -{" "}
                        {moment.utc(schedule?.tt_time_end).format("mm : hh a")}
                      </td>
                      <td>{schedule?.school_course?.course_name}</td>
                      <td>
                        <OverlayTrigger
                          trigger="hover"
                          key={"right"}
                          placement={"right"}
                          overlay={
                            <Popover id={`popover-positioned-${"right"}`}>
                              <Popover.Header as="h3">
                                Teacher info
                              </Popover.Header>
                              <Popover.Body>
                                <strong>Email:</strong>{" "}
                                {schedule?.user?.user_email} <br />
                                <strong>Contact:</strong>{" "}
                                {
                                  schedule?.user?.school_teacher[0]
                                    ?.teacher_phone
                                }
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button
                            variant="light"
                            className="d-inline-flex a_LinkHeight align-items-center"
                          >
                            {schedule?.user?.user_name}
                          </Button>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ShowToast show={isDialog} msg={msg} from={"student"} />
    </>
  );
};

export default ParentView;
