import { HiOutlineUsers } from "react-icons/hi";
import { BsBuilding, BsCalendar2Check, BsTable } from "react-icons/bs";
import { RiParentLine, RiLogoutCircleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";

// export const logout = () => async (dispatch, getstate) => {
//   localStorage.removeItem("token");
//   window.location.reload(false);
// }

import { logout } from '../../../App/Redux/Action/userActions';

const sideComp = [
  { to: "home", name: "Dashboard", icon: BiHomeAlt },
  { to: "school", name: "School", icon: BsBuilding },
  { to: "student", name: "Student", icon: HiOutlineUsers },
  { to: "parent", name: "Parent", icon: RiParentLine },
  { to: "teacher", name: "Teacher", icon: FaChalkboardTeacher },
  { to: "class", name: "Class", icon: SiGoogleclassroom },
  { to: "exam", name: "Exam", icon: BsCalendar2Check },
  { to: "attendance", name: "Attendence", icon: MdOutlineEventAvailable },
  { to: "timetable", name: "Class Routine", icon: BsTable },
  {
    to: "/",
    name: "Logout",
    icon: RiLogoutCircleLine,
    handleClick: logout(),
  },
];

export default sideComp;
