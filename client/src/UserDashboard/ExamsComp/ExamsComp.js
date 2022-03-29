import React, { useEffect } from "react";

import "./ExamsComp.css"


import { Card, Nav } from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";


import MidExams from "./MidExams/MidExams";
import FinalExams from "./FinalExams/FinalExams";
import AddMidExam from "./AddMidExam/AddMidExam";
import AddFinalExam from "./AddFinalExams/AddFinalExams";
const ExamsComp = () => {
    let history = useNavigate();

    useEffect(() => {  
      history('view');
    }, []);
    
    return (
      <div className="teacher_cont h-100">
        <Card className="h-100">
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="/view">
              <Nav.Item>
                <NavLink to="midExmas" className="nav-link">
                  Midterm Exams Schedule
                </NavLink>      
              </Nav.Item>
              <Nav.Item>
                <NavLink to="finalExams" className="nav-link">
                Finalterm Exams Schedule
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="addMidExams" className="nav-link">
                Add Midterm Exams
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="addFinalExams" className="nav-link">
                Add Finalterm Exams
                </NavLink>
              </Nav.Item>
             
             
            </Nav>
          </Card.Header>
          <Card.Body>
            <Routes>
              <Route path="/midExmas" element={<MidExams />} />
              <Route path="/finalExams" element={<FinalExams/>} />
              <Route path="/addMidExams" element={<AddMidExam/>} />
              <Route path="/addFinalExams" element={<AddFinalExam/>} />
            </Routes>
          </Card.Body>
        </Card>
      </div>
    );
}

export default ExamsComp