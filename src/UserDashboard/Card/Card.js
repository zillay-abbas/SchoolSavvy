import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import "./Card.css";

const Card = () => {

  const { all:students } = useSelector(state => state?.student);
  const { all:teachers } = useSelector(state => state?.teacher);
  const { all:subjects } = useSelector(state => state?.subject);
  const { all:parents } = useSelector(state => state?.parent);


  return (
    <div className="sch-card">

      <div className="des__card">
        <div className="card__ico card__xp">
          <FontAwesomeIcon
            className="f_36 text_c_yellow"
            icon="fa-solid fa-user-graduate"
          />
        </div>
        <div className="card__xp">
          <div className="card__name">Students</div>
          <div className="card__value">{ students?.length  }</div>
        </div>
      </div>

      <div className="des__card">
        <div className="card__ico card__xp">
          <FontAwesomeIcon
            className="f_36 text_c_red"
            icon="fa-solid fa-users"
          />
        </div>
        <div className="card__xp">
          <div className="card__name">Parents</div>
          <div className="card__value">{parents?.length }</div>
        </div>
      </div>

      <div className="des__card">
        <div className="card__ico card__xp">
          <FontAwesomeIcon
            className="f_36 text_c_green"
            icon="fa-solid fa-user-tie"
          />
        </div>
        <div className="card__xp">
          <div className="card__name">Teachers</div>
          <div className="card__value">{ teachers?.length }</div>
        </div>
      </div>

      <div className="des__card">
        <div className="card__ico card__xp">
          <FontAwesomeIcon
            className="f_36 text_c_blue"
            icon="fa-solid fa-book-open"
          />
        </div>
        <div className="card__xp">
          <div className="card__name">Subjects</div>
          <div className="card__value">{ subjects?.length }</div>
        </div>
      </div>
      
    </div>
  );
};

export default Card;
