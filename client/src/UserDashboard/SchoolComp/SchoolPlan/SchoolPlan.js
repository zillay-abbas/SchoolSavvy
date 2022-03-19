import React from "react";

import { Alert, Accordion, Button, Card, Badge } from "react-bootstrap";

import "./SchoolPlan.css";

const SchoolPlan = () => {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Hey, User Name </Alert.Heading>
        <p>
          You are currently using this plan. If you want to upgrade your plan
          then check below list.
        </p>
        <Accordion defaultActiveKey="">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Free Plan</Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button variant="primary">Activate</Button>{" "}
                <Badge bg="secondary">Price: 0 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Montly Subscription</Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button variant="primary">Activate</Button>{" "}
                <Badge bg="secondary">Price: 10,000 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Yearly Subscription</Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button variant="primary">Activate</Button>{" "}
                <Badge bg="secondary">Price: 100,000 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Alert>
    </div>
  );
};

export default SchoolPlan;
