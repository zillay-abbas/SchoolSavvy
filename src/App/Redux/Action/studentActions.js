import axios from "../../axios";

import { studentActions } from "../Slice/studentSlice";

export const loadSchoolStudents = () => {
  return async (dispatch, getState) => {
    dispatch(studentActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/student/getAll", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(studentActions.studentLoadSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(studentActions.studentlLoadFailure(err));
    }
  };
};

export const loadCurrentStudent = () => {
  return async (dispatch, getState) => {
    dispatch(studentActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/student/getCurrent", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(studentActions.loadCurrentStudentSuccess(data));
    } catch (err) {
      dispatch(studentActions.loadCurrentStudentFailure(err));
    }
  };
};

export const loadParentStudents = () => {
  return async (dispatch, getState) => {
    dispatch(studentActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/student/getParentStudents", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(studentActions.studentLoadSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(studentActions.studentlLoadFailure(err));
    }
  };
};

export const createStudent = (
  id,
  name,
  dob,
  email,
  password,
  grade,
  section
) => {
  return async (dispatch, getState) => {
    dispatch(studentActions.loadingRequest());

    try {
      const schoolId = getState()?.dashboard?.school.id;

      const { data } = await axios.post(
        "/v1/user/student/add",
        { id, name, dob, email, password, grade, section, schoolId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(studentActions.studentCreateSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(studentActions.studentCreateFailure(err));
    }
  };
};

export const updateStudent = (
  id,
  regNo,
  name,
  dob,
  email,
  password,
  grade,
  section
) => {
  return async (dispatch, getState) => {
    dispatch(studentActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/student/update",
        { id, regNo, name, dob, email, password, grade, section },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(studentActions.studentUpdateSuccess(data));
    } catch (err) {
      console.log(err.response);
      dispatch(studentActions.studentUpdateFailure(err));
    }
  };
};

export const removeStudent = (stdId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/student/remove",
        { stdId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(studentActions.studentRemoveSuccess(data));
    } catch (err) {
      dispatch(studentActions.studentRemoveFailure(err));
    }
  };
};

export const searchFromState = (stdId) => {
  return async (dispatch) => {
    console.log(stdId);
    dispatch(studentActions.searchStudentFromState(stdId));
  };
};

export const hideStudentErrorMsg = () => {
  return async (dispatch) => {
    dispatch(studentActions.hideStudentErrorMsg());
  };
};
