import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NoticeBoard.css";
import NoticeItem from "./NoticeItem/NoticeItem";

const NoticeBoard = () => {
  return (
    <div className="notice_card">
      <div className="notice_head">
        <h5 className="h5_no_m">Notice</h5>
      </div>
      <div className="notice_detail">
        <div className="notice_top">
          <FontAwesomeIcon className="text_c_yellow f_20 mx-1" icon="fa-solid fa-certificate" />
          <h6 className="text_muted f_15 h_no_m mx-3">Welcome to SchoolSavvy!</h6>
        </div>
        <div className="notice_border_line"></div>
        <NoticeItem />
      </div>
    </div>
  );
};

export default NoticeBoard;
