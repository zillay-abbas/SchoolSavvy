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
      dispatch(dashboardActions.dashboardFailure(err));
    }
  };
};

export const setDashboardSchool = (schoolID) => {
  return async (dispatch, getstate) => {
    dispatch(dashboardActions.loadingRequest());
    const userID = getstate().user.detail.id;

    try {
      const { data } = await axios.post("/v1/user/dashboard/school/current",
        { userID, schoolID },
        {
          headers: {
            Authorization: `Bearer ${getstate().user.token}`,
          },
        }
      );

      dispatch(dashboardActions.activeDashboardSchoolSuccess(data));
    } catch (err) {
      dispatch(dashboardActions.activeDashboardSchoolFailure(err));
    }
  };
};