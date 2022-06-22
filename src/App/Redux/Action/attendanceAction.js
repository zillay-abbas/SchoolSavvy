import axios from "../../axios";

import { attendanceActions } from "../Slice/attendanceSlice";

export const hideAttendanceErrorMsg = () => {
  return async (dispatch) => {
    dispatch(attendanceActions.hideErrorMsg());
  };
};

export const submitAttendance = (students, classId, secId) => {
  return async (dispatch, getState) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;
      const tId = getState().teacher.current.school_teacher.teacher_id;

      const { data } = await axios.post(
        "/v1/user/attendance/submit",
        { tId, students, classId, secId, schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(attendanceActions.attendanceSubmitted(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};

export const updateAttendance = (record) => {
  return async (dispatch, getState) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/attendance/update",
        { record },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(attendanceActions.updateSuccess(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};

export const loadTeacherAttendance = () => {
  return async (dispatch, getstate) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/attendance/getTeacherView", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(attendanceActions.loadAttendanceSuccess(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};

export const loadSchoolAttendance = () => {
  return async (dispatch, getstate) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/attendance/getAdminView", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(attendanceActions.loadAttendanceSuccess(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};

export const loadStudentAttendance = () => {
  return async (dispatch, getstate) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/attendance/getStudentView", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      dispatch(attendanceActions.loadAttendanceSuccess(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};

export const loadParentAttendance = (stdArray) => {
  return async (dispatch, getstate) => {
    dispatch(attendanceActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/attendance/getParentView",
        { stdArray },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );
      dispatch(attendanceActions.loadAttendanceSuccess(data));
    } catch (err) {
      dispatch(attendanceActions.onFailure(err));
    }
  };
};
