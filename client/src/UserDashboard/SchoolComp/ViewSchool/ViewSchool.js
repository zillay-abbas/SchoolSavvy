import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SchoolCard from './SchoolCard';

import "./ViewSchool.css";

const ViewSchool = () => {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, [])
  
  return (
    <div className="school_cont">
      <SchoolCard />
    </div>
  )
}

export default ViewSchool