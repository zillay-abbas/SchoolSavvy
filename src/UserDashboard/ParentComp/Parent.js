import React, { useEffect } from "react";

import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import AddParent from "./AddParent/Addparent";
import ViewParent from "./ViewParent/Viewparent";
import ParentInfo from "./ParentInfo/parentinfo";

import "./parent.css";

const Parent = () => {
  let history = useNavigate();

  useEffect(() => {
    history("add");
  }, []);

  return (
    <div className="school_cont h-100">
      <Card >
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/view">
            <Nav.Item>
              <NavLink to="add" className="nav-link">
                Add Parent
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="view" className="nav-link">
                Search Parent
              </NavLink>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path="/add" element={<AddParent />} />
            <Route path="/view" element={<ViewParent />} />
          </Routes>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Parent;
