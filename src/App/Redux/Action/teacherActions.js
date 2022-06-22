import axios from "../../axios";

import { teacherActions } from "../Slice/teacherSlice";

export const createTeacher = (
  name,
  email,
  password,
  description,
  contact,
  city
) => {
  return async (dispatch, getState) => {
    dispatch(teacherActions.loadingRequest());

    try {
      const schoolId = getState()?.dashboard?.school.id;

      const { data } = await axios.post(
        "/v1/user/teacher/add",
        { name, email, password, description, contact, city, schoolId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(teacherActions.teacherCreateSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(teacherActions.teacherCreateFailure(err));
    }
  };
};

export const updateTeacher = (
  userId,
  name,
  email,
  password,
  description,
  contact,
  city
) => {
  return async (dispatch, getState) => {
    dispatch(teacherActions.loadingRequest());

    try {
      const schoolId = getState()?.dashboard?.school.id;

      const { data } = await axios.post(
        "/v1/user/teacher/update",
        { userId,
          name,
          email,
          password,
          description,
          contact,
          city,
          schoolId,
        },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(teacherActions.teacherUpdateSuccess(data));
    } catch (err) {
      console.log(err.response);
      dispatch(teacherActions.teacherUpdateFailure(err));
    }
  };

};

export const removeTeacher = (userId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/teacher/remove",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(teacherActions.teacherRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(teacherActions.teacherRemoveFailure(err));
    }
  };
};

export const loadTeachers = () => {
  return async (dispatch, getState) => {
    dispatch(teacherActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/teacher/getAll", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(teacherActions.teacherLoadSuccess(data));
    } catch (err) {
      dispatch(teacherActions.teacherLoadFailure(err));
    }
  };
};

export const loadCurrentTeacher = () => {
  return async (dispatch, getState) => {
    dispatch(teacherActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/teacher/getCurrent", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      console.log(data);
      dispatch(teacherActions.loadCurrentTeacherSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(teacherActions.loadCurrentTeacherFailure(err));
    }
  };
};

export const hideTeacherErrorMsg = () => {
  return async (dispatch) => {
    dispatch(teacherActions.hideTeacherErrorMsg());
  };
};
