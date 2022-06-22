import { HiOutlineUsers } from "react-icons/hi";
import { BsBuilding, BsCalendar2Check, BsTable } from "react-icons/bs";
import { RiParentLine, RiLogoutCircleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";

import * as role from "../../../App/Redux/Constant/userConstant";
// export const logout = () => async (dispatch, getstate) => {
//   localStorage.removeItem("token");
//   window.location.reload(false);
// }

import { logout } from "../../../App/Redux/Action/userActions";

const sideComp = [
  {
    to: "home",
    name: "Dashboard",
    icon: BiHomeAlt,
    role: { admin: true, student: false, teacher: false, parent: false },
  },
  {
    to: "school",
    name: "School",
    icon: BsBuilding,
    role: { admin: true, student: false, teacher: false, parent: false },
  },
  {
    to: "student",
    name: "Student",
    icon: HiOutlineUsers,
    role: { admin: true, student: false, teacher: false, parent: true },
  },
  {
    to: "parent",
    name: "Parent",
    icon: RiParentLine,
    role: { admin: true, student: false, teacher: false, parent: false },
  },
  {
    to: "teacher",
    name: "Teacher",
    icon: FaChalkboardTeacher,
    role: { admin: true, student: false, teacher: true, parent: false },
  },
  {
    to: "class",
    name: "Class",
    icon: SiGoogleclassroom,
    role: { admin: true, student: true, teacher: true, parent: false },
  },
  {
    to: "exam",
    name: "Exam",
    icon: BsCalendar2Check,
    role: { admin: true, student: true, teacher: true, parent: true },
  },
  {
    to: "attendance",
    name: "Attendence",
    icon: MdOutlineEventAvailable,
    role: {admin: true, student: true, teacher: true, parent: true },
  },
  // {
  //   to: "timetable",
  //   name: "Class Routine",
  //   icon: BsTable,
  //   role: { admin: true, student: true, teacher: true, parent: true },
  // },
  {
    to: "/",
    name: "Logout",
    icon: RiLogoutCircleLine,
    role: { admin: true, student: true, teacher: true, parent: true },
    handleClick: logout(),
  },
];

export default sideComp;
