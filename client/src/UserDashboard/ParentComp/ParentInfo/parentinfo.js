import React, { useEffect,useState } from 'react';

import { Button, Form, Row, Col, Table } from "react-bootstrap";

import "./parentinfo.css";

const ViewTeacher = () => {

  return (

    <div className="container  visibile">
    <label className='table-lable'>Detail</label>

    <Table class="table mt-5 border:1" striped bordered hover>
  <thead >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Phone No</th>
      <th scope="col">Status</th>
      <th scope="col">School Id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo123</td>
      <td>+123456</td>
      <td>Empity</td>
      <td>bs-6</td>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default ViewTeacher