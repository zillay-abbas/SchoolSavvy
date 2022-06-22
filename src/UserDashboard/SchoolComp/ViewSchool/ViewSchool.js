import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SchoolCard from "./SchoolCard";

import { loadSchools } from "../../../App/Redux/Action/schoolActions";
import { Alert } from "react-bootstrap";

import ShowToast from "../../../App/Toast";

import "./ViewSchool.css";

const ViewSchool = () => {
  const { token } = useSelector((state) => state.user);
  const { msg, all, isDialog } = useSelector((state) => state.school);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSchools(token));
  }, []);

  return (
    <div className="school_cont">
      {Object.keys(all).length <= 0 ? (
        <Alert variant="success">
          <Alert.Heading>You don't have any schools</Alert.Heading>
        </Alert>
        ) : (
          <SchoolCard />
      )}
      <ShowToast show={isDialog} msg={msg} from={"school"}/>
    </div>
  );
};

export default ViewSchool;
