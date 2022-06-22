import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import Timetable from './TimeTable/timetable';
import ViewTimeTable from './ViewTimeTable/viewtable';

import "./routine.css";

const Routine = () => {
  let history = useNavigate();

  useEffect(() => {  
    history('view');
  }, []);
  
  return (
    <div className="school_cont h-100">
      <Card className="h-100">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="view" className="nav-link">
                Add Timetable
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="info" className="nav-link">
                TimeTable
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/view" element={<Timetable/>} />
            <Route path="/add" element={<></>} />
            <Route path="/info" element={<ViewTimeTable/>} />
            <Route path="/remove" element={<>remove</>} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Routine;
