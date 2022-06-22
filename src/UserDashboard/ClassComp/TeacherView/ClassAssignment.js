import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadAssignments } from "../../../App/Redux/Action/classActions";
import moment from "moment";

import "./ClassAssignment.css";

const ClassAssignment = () => {
  const { assignment } = useSelector((state) => state.class);
  const dispatch = useDispatch();

  const [isExists, setisExists] = useState(false);

  useEffect(() => {
    dispatch(loadAssignments());

    assignment?.map((item) => {
      if (item?.handedIn.length > 0) {
        setisExists(true);
      }
    });
  }, []);

  return (
    <>
      {!isExists ? (
        <label className="table-lable">
          Submitted assignments will appear here
        </label>
      ) : (
        <>
          <label className="table-lable">
            Assignment Details
          </label>
          <div className="assignment_table">
            <Table class="table mt-6 border:1" bordered hover>
              <thead>
                <tr>
                  <th scope="col">Reg No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Class</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Submission Date</th>
                  <th scope="col">Marks</th>
                </tr>
              </thead>
              <tbody>
                {assignment.map((item) => {
                  if (item?.handedIn.length > 0) {
                    return item?.handedIn?.map((handedin) => (
                      <tr>
                        <td>{handedin?.school_student?.student_reg_no}</td>
                        <td>{handedin?.school_student?.user?.user_name}</td>
                        <td>
                          {item?.school_class_room?.cl_name +
                            " (" +
                            item?.class_section?.section_name +
                            ")"}
                        </td>
                        <td>
                          {moment
                            .utc(item?.duedate)
                            .format("DD/MM/YYYY hh:mm a")}
                        </td>
                        <td>
                          {moment
                            .utc(handedin?.uploadingtime)
                            .format("DD/MM/YYYY hh:mm a")}
                        </td>
                        <td>
                          {handedin?.gainmarks === null ? (
                            <>
                              {item?.totalmarks}
                              <small>
                                <i>Not marked</i>
                              </small>{" "}
                            </>
                          ) : (
                            <>
                              {handedin?.gainmarks} / {item?.totalmarks}
                            </>
                          )}
                        </td>
                      </tr>
                    ));
                  }
                })}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default ClassAssignment;
