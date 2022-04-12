import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddParent from './AddParent/addparent';
import ViewParent from './ViewParent/viewparent';
import ParentInfo from './ParentInfo/parentinfo'; 

import "./parent.css";

const Parent = () => {
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
                Add Parent
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Search Parent
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="pinfo" className="nav-link">
                Parent-Information
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/view" element={<AddParent/>} />
            <Route path="/add" element={<ViewParent/>} />
            <Route path="/pinfo" element={<ParentInfo/>} />
            <Route path="/remove" element={<>remove</>} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Parent;
