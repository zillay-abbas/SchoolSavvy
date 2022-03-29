import React, { useEffect } from "react";

import { AiOutlineHome } from "react-icons/ai";
import { Breadcrumb } from "react-bootstrap";

import SideComp from "../../Sidebar/SideComp/SideComp";
import { Link, useLocation } from "react-router-dom";

import "./BreadCrumbs.css";

const BreadCrumbs = () => {
  const location = useLocation();
  let path = location.pathname.split("/");

  return (
    <div>
      <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <AiOutlineHome />
          </Breadcrumb.Item>
        {SideComp.map((comp) => {
          return (
            <>
              {path[2] === comp.to ? (
                <Breadcrumb.Item>{comp.name}</Breadcrumb.Item>
              ) : (
                ""
              )}
            </>
            // <Breadcrumb.Item>{comp.name}</Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbs;
