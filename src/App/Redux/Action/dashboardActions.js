import axios from "../../axios";

import { dashboardActions } from "../Slice/dashboardSlice";

export const loadDashboard = (token) => {
  return async (dispatch) => {
    dispatch(dashboardActions.loadingRequest());

    try {
      const { data } = await axios.get("/v1/user/dashboard/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(dashboardActions.dashboardSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.onFailure(err));
    }
  };
};

export const setDashboardSchool = (schoolID) => {
  return async (dispatch, getstate) => {
    dispatch(dashboardActions.loadingRequest());
    const userID = getstate().user.detail.id;

    try {
      const { data } = await axios.post(
        "/v1/user/dashboard/school/current",
        { userID, schoolID },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(dashboardActions.activeDashboardSchoolSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.onFailure(err));
    }
  };
};

export const addNotice = (heading, desc) => {
  return async (dispatch, getState) => {
    dispatch(dashboardActions.loadingRequest());

    try {
      const schId = getState().dashboard.school.id;
      const { data } = await axios.post(
        "/v1/user/dashboard/notice",
        { heading, desc, schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(dashboardActions.noticeCreateSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.onFailure(err));
    }
  };
};

export const updateNotice = (id, heading, desc) => {
  return async (dispatch, getState) => {
    dispatch(dashboardActions.loadingRequest());

    try {      
      const { data } = await axios.post(
        "/v1/user/dashboard/noticeUpdate",
        { id, heading, desc },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(dashboardActions.noticeUpdateSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.onFailure(err));
    }
  };
};

export const loadNotice = () => {
  return async (dispatch, getState) => {
    dispatch(dashboardActions.loadingRequest());
    try {
      const schId = getState().dashboard.school.id;

      const { data } = await axios.post(
        "/v1/user/dashboard/getNotice",
        { schId },
        {
          headers: {
            Authorization: `Bearer ${getState().user.token}`,
          },
        }
      );
      dispatch(dashboardActions.noticeLoadSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.onFailure(err));
    }
  };
};

export const hideDashboardErrorMsg = () => {
  return async (dispatch) => {
    dispatch(dashboardActions.hideErrorMsg());
  };
};
