import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideComp from "./SideComp/SideComp";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import * as role from "../../App/Redux/Constant/userConstant";

import "./Sidebar.css";

const UserSidebar = ({ is_Open, on_Toggle }) => {
  const sideDrawerClass = ["sidebar_left"];
  const dispatch = useDispatch();

  const { detail } = useSelector((state) => state.user);

  const { userImg } = useSelector((state) => state.class);

  const [roles, setRole] = useState("");

  if (is_Open) {
    sideDrawerClass.push("show");
  }

  useEffect(() => {
    switch (detail.role) {
      case role.ADMIN:
        setRole("admin");
        break;
      case role.PARENT:
        setRole("parent");
        break;
      case role.STUDENT:
        setRole("student");
        break;
      case role.TEACHER:
        setRole("teacher");
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className={sideDrawerClass.join(" ")}>
      <div className="side_col">
        <div className="top_profile">
          <div className="img_upt">

          <img src={"http://localhost:3001/"+ userImg?.substr(6)} alt="user" />
          </div>
          {/* <FontAwesomeIcon className="user_profile" icon="fa-solid fa-user" />  */}
          <span
            className={
              is_Open ? "user_name py-1 t-bold-dark" : "user_name_none"
            }
          >
            {detail?.name}
          </span>
        </div>
        <div className="opt_section">
          <ul className={is_Open ? "submenu" : "submenu p-none"}>
            {SideComp.map((component, index) => {
              return (
                <>
                  {component.role[roles] ? (
                    <li
                      className="py_5"
                      onClick={
                        component.handleClick
                          ? () => dispatch(component?.handleClick)
                          : component?.handleClick
                      }
                      key={index}
                    >
                      <NavLink
                        to={component.to}
                        className={({ isActive }) =>
                          is_Open
                            ? isActive
                              ? "side_item item_active"
                              : "side_item"
                            : isActive
                            ? "side_item_center item_active"
                            : "t-black side_item_center"
                        }
                      >
                        <component.icon
                          className={
                            is_Open ? "side__icon mx-4" : "side__icon_large"
                          }
                        />
                        <span
                          className={
                            is_Open ? "show_item_name" : "item_name_none"
                          }
                        >
                          {component.name}
                        </span>
                      </NavLink>
                    </li>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
