import React from "react";

import { Accordion, Button } from "react-bootstrap";

import "./SchoolCard.css";

const SchoolCard = () => {
  return (
    <div>
      <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>School Name</Accordion.Header>
          <Accordion.Body>
            <div className="school_opt">
              <Button variant="primary">Active</Button>{" "}
              <Button variant="secondary">Remove</Button>{" "}
              <Button variant="success">Edit</Button>{" "}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default SchoolCard;
