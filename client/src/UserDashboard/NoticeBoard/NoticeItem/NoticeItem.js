import React from "react";

import "./NoticeItem.css";

const NoticeItem = () => {
  return (
    <div className="notice_item">
      <i className="task_icon bg_c_blue notice_ico"></i>
      <div className="top_title">
        <p className="p_no_m notice_date">Sun, 17 Feb</p>
        <h6 className="h_no_m text-muted notice_desc">
          Your second semester exam will held on 30-08-2018. Please be prepare
          for your exam.
        </h6>
      </div>
    </div>
  );
};

export default NoticeItem;
