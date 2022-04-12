import React, { useState } from "react";

import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addClassTimeTable } from "../../../App/Redux/Action/classActions";

function ClassSchedule() {
  const { all } = useSelector((state) => state.class);
  const { all: teachers } = useSelector((state) => state.teacher);
  const { all: subjects } = useSelector((state) => state.subject);
  const dispatch = useDispatch();

  const [section, setSection] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [classErr, setClassErr] = useState("");
  const [teacherErr, setTeacherErr] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }
    if (section !== "" && selectedClass !== "") {
      setValidated(true);
      dispatch(
        addClassTimeTable(
          selectedClass.class_id,
          section.section_id,
          selectedTeacher.teacher_id,
          selectedSubject.course_id,
          selectedDay,
          selectedTime,
          endTime
        )
      );
    } else {
      setClassErr("Please enter class and section");
    }
  };

  return (
    <>
    </>
  );
}

// render(<ClassSchedule />);
export default ClassSchedule;
