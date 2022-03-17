import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideComp from "./SideComp/SideComp";

import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const UserSidebar = ({ is_Open, on_Toggle }) => {
  const sideDrawerClass = ["sidebar_left"];

  if (is_Open) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <div className="side_col">
        <div className="top_profile">
          <FontAwesomeIcon className="user_profile" icon="fa-solid fa-user" />
          <span
            className={
              is_Open ? "user_name py-1 t-bold-dark" : "user_name_none"
            }
          >
            User Name
          </span>
        </div>
        <div className="opt_section">
          <ul className={is_Open ? "submenu" : "submenu p-none"}>
            {SideComp.map((component, index) => {
              return (
                <li className="py_5" onClick={component?.handleClick} key={index}>
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
                      className={is_Open ? "show_item_name" : "item_name_none"}
                    >
                      {component.name}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
