import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import "./ViewSchool.css";

const ViewSchool = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
  }, [])
  
  return (
    <div className="school_cont">


    </div>
  )
}

export default ViewSchool