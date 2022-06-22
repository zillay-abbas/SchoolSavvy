import axios from "../../axios";

import { subjectActions } from "../Slice/subjectSlice";

export const loadSubjects = () => {
  return async (dispatch, getstate) => {
    dispatch(subjectActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/subject/getAll", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });
      console.log("getts");

      dispatch(subjectActions.subjectLoadSuccess(data));

    } catch (err) {
      console.log(err);
      dispatch(subjectActions.subjectlLoadFailure(err));
    }
  };
};

export const addSubject = (name, desc, classId) => {
  return async (dispatch, getState) => {
    dispatch(subjectActions.loadingRequest());

    try {
      const schoolId = getState().dashboard.school.id;
      const { data } = await axios.post(
        "/v1/user/subject/add",
        { name, desc, classId, schoolId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(subjectActions.subjectCreateSuccess(data));
    } catch (err) {
      dispatch(subjectActions.subjectCreateFailure(err));
    }
  };
};

export const updateSubject = (subjId, name, desc, classId) => {
  return async (dispatch, getState) => {
    dispatch(subjectActions.loadingRequest());

    try {
      const schoolId = getState().dashboard.school.id;
      const { data } = await axios.post(
        "/v1/user/subject/update",
        { subjId, name, desc, classId, schoolId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(subjectActions.subjectUpdateSuccess(data));
    } catch (err) {
      dispatch(subjectActions.subjectUpdateFailure(err));
    }
  };
};

export const removeSubject = (subjId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/subject/remove",
        { subjId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      console.log(data);
      dispatch(subjectActions.subjectRemoveSuccess(data));
    } catch (err) {
      dispatch(subjectActions.subjectRemoveFailure(err));
    }
  };
};

export const hideSubjectErrorMsg = () => {
  return async (dispatch) => {
    dispatch(subjectActions.hideSubjectErrorMsg());
  };
};
