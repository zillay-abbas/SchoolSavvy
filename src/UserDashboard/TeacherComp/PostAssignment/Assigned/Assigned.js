import React from "react";
import { Form, Table } from "react-bootstrap";
import moment from "moment";

const Assigned = ({ task }) => {
  return (
    <div>
      <Form.Label>{task?.school_class_room?.cl_name}</Form.Label>
      <Form.Label>&nbsp;&nbsp;Section: &nbsp;</Form.Label>
      <Form.Label>{task?.class_section?.section_name}</Form.Label>
      <Form.Label>&nbsp;&nbsp;Duedate: &nbsp;</Form.Label>
      <Form.Label>
        {moment(task?.duedate).format("MMMM Do YYYY, h:mm a")}
      </Form.Label>
      <Form.Label>&nbsp;&nbsp;Total Marks: &nbsp;</Form.Label>
      <Form.Label>{task?.totalmarks}</Form.Label>

      <Table class="table mt-6 border:1" bordered hover>
        <thead>
          <tr>
            <th scope="col">Reg no.</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {task?.assigned?.map((item) => (
            <tr>
              <td>{item?.student_reg_no}</td>
              <td>{item?.user?.user_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Assigned;
