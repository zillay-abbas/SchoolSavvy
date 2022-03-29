import React, { useEffect, useState } from "react";
import {
  Alert,
  Accordion,
  Button,
  Badge,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ShowToast from "../../../App/alert";
import Moment from 'react-moment';

import { loadUserPlan } from "../../../App/Redux/Action/planAction";

import { Package } from "./Package/Package";

import "./SchoolPlan.css";

const SchoolPlan = () => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.plan);
  // const [show, setShow] = useState(false);

  const [payment, setPayment] = useState();
  const [interval, setInterval] = useState();
  const [planId, setPlanId] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (payment, interval, Id) => {
    setPayment(payment);
    setPlanId(Id);
    setInterval(interval);
    setShow(true);
  };

  useEffect(() => {
    console.log("plan page");
    dispatch(loadUserPlan());
  }, []);

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
                <Button variant="primary" disabled="true">
                  Activate
                </Button>
                {detail?.sb_plan_id === 1 ? <Badge bg="secondary">Subscription ends: <Moment date={detail?.sb_end_time} /></Badge> : <></>}
                <Badge bg="secondary">Price: 0 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Montly Subscription</Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button
                  variant="primary"
                  disabled={detail?.sb_plan_id === 2 ? true : false}
                  onClick={() => handleShow(10000, "month", 2)}
                >
                  Activate
                </Button>
                {detail?.sb_plan_id === 2 ? <Badge bg="secondary">Subscription ends: <Moment date={detail?.sb_end_time} /></Badge> : <></>}
                <Badge bg="secondary">Price: 10,000 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Yearly Subscription</Accordion.Header>
            <Accordion.Body>
              <div className="school_opt">
                <Button
                  variant="primary"
                  disabled={detail?.sb_plan_id === 3 ? true : false}
                  onClick={() => handleShow(100000, "year", 3)}
                >
                  Activate
                </Button>
                {detail?.sb_plan_id === 3 ? <Badge bg="secondary">Ends:&#160; <Moment format="YYYY/MM/DD" date={detail?.sb_end_time} /></Badge> : <></>}
                <Badge bg="secondary">Price: 100,000 Rs</Badge>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {detail?.sb_plan_id !== 1 ? (
          <>
            {detail?.sb_end_time <= new Date().getTime() ? (
              <>
                <Modal show={show} onHide={handleClose}>
                  <Package
                    subID={planId}
                    interval={interval}
                    payment={payment}
                  />
                </Modal>
              </>
            ) : (
              <>
                <ShowToast
                  show={show}
                  msg={`You cannot update subscription until your previous subscription ends.`}
                  setShow={handleClose}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Modal show={show} onHide={handleClose}>
              <Package subID={planId} interval={interval} payment={payment} />
            </Modal>
          </>
        )}
      </Alert>
    </div>
  );
};

export default SchoolPlan;
