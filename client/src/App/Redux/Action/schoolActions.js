import axios from "../../axios";

import { schoolActions } from "../Slice/schoolSlice";

export const loadSchools = (token) => {
  return async (dispatch) => {
    dispatch(schoolActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/dashboard/school", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(schoolActions.schoolLoadSuccess(data));
    } catch (err) {
      dispatch(schoolActions.schoolLoadFailure(err));
    }
  };
};

export const createSchool = (name, desc, email) => {
  return async (dispatch, getState) => {
    dispatch(schoolActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/dashboard/school",
        { name, desc, email },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(schoolActions.schoolCreateSuccess(data));
    } catch (err) {
      dispatch(schoolActions.schoolCreateFailure(err));
    }
  };
};

export const removeSchool = (schoolID) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(
        "/v1/user/dashboard/school", {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
          data: {
             schoolID,
          }
        }
      );

      dispatch(schoolActions.schoolRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(schoolActions.schoolCreateFailure(err));
    }
  };
};

export const updateSchool = (id, name, desc, email) => {
  return async (dispatch, getState) => {
    dispatch(schoolActions.loadingRequest());

    try {
      const { data } = await axios.put(
        "/v1/user/dashboard/school",
        { id, name, desc, email },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );

      dispatch(schoolActions.schoolUpdateSuccess(data));
    } catch (err) {
      dispatch(schoolActions.schoolUpdateFailure(err));
    }
  };
};

export const hideSchoolErrorMsg = () => {
  return async (dispatch) => {
    dispatch(schoolActions.hideErrorMsg());
  };
};