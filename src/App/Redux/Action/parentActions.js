import axios from "../../axios";

import { parentActions } from "../Slice/parentSlice";

export const addParent = (name, email, password, phone, stdArray) => {
  return async (dispatch, getState) => {
    dispatch(parentActions.loadingRequest());

    try {
      const schoolId = getState()?.dashboard?.school.id;

      const { data } = await axios.post(
        "/v1/user/parent/add",
        { name, email, password, phone, stdArray, schoolId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(parentActions.parentCreateSuccess(data));
    } catch (err) {
      console.log(err.response);
      dispatch(parentActions.onFailure(err));
    }
  };
};

export const loadParents = () => {
  return async (dispatch, getState) => {
    dispatch(parentActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/parent/getAll", {
        headers: {
          Authorization: `Bearer ${getState().user.token}`,
        },
      });

      dispatch(parentActions.parentLoadSuccess(data));
    } catch (err) {
      dispatch(parentActions.onFailure(err));
    }
  };
};

export const updateParent = (id, name, contact, email, password) => {
  return async (dispatch, getState) => {
    dispatch(parentActions.loadingRequest());

    try {
      const schoolId = getState()?.dashboard?.school.id;

      const { data } = await axios.post(
        "/v1/user/parent/update",

        { id, name, contact, email, password },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(parentActions.parentUpdateSuccess(data));
    } catch (err) {
      console.log(err.response);
      dispatch(parentActions.onFailure(err));
    }
  };
};

export const removeParent = (userId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/v1/user/parent/remove",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      console.log(data);
      dispatch(parentActions.parentRemoveSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(parentActions.onFailure(err));
    }
  };
};

export const hideParentErrorMsg = () => {
  return async (dispatch) => {
    dispatch(parentActions.hideParentErrorMsg());
  };
};
