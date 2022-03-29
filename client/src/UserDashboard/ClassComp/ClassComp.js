import React, { useEffect , useState } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import { Button, Form, Row, Col , Table, Modal, InputGroup } from "react-bootstrap";

import AddClass from "./AddClass/AddClass"
import AllClassSchedule from "./AllClassSchedule/AllClassSchedule"
import ClassAssignment from "./ClassAssignment/ClassAssignment";
import ClassSchedule from "./ClassSchedule/ClassSchedule";
// import "./ClassComp.css";

const ClassComp = () => {
  let history = useNavigate();

  useEffect(() => {  
    history('');
  }, []);

   
  return (
    <div className="Class_cont h-100">
      <Card className="h-100">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Add New Class
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="allClassSchedule" className="nav-link">
                All Classes Schedule
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="classSchedule" className="nav-link">
                 Class Schedule
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="assignment" className="nav-link">
                 Class Assigment
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/view" element={<>view</>} />
            <Route path="/add" element={<AddClass />} />
            <Route path="/allClassSchedule" element={<AllClassSchedule/>} />
            <Route path="/classSchedule" element={<ClassSchedule/>} />
            <Route path="/assignment" element={<ClassAssignment/>} />
          </Routes>
        </Card.Body>
      </Card>



    </div>
  );
};

export default ClassComp;
