import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

<<<<<<< HEAD
=======
import SchoolCard from "./SchoolCard";

import { loadSchools } from "../../../App/Redux/Action/schoolActions";
import { Alert } from "react-bootstrap";

import ShowToast from "../../../App/Toast";

>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
import "./ViewSchool.css";

const ViewSchool = () => {
  const { token } = useSelector((state) => state.user);
  const { msg, all, isDialog } = useSelector((state) => state.school);

  const dispatch = useDispatch();

  useEffect(() => {
<<<<<<< HEAD
    dispatch();
  }, [])
  
  return (
    <div className="school_cont">


=======
    console.log("load sch");
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
>>>>>>> 3912ef269a04caeeb2979e8d5f6b3906b0247a3c
    </div>
  );
};

export default ViewSchool;
