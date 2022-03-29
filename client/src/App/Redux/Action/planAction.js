import axios from "../../axios";
import { planActions } from "../Slice/planSlice";

export const loadUserPlan = () => {
  return async (dispatch, getstate) => {
    dispatch(planActions.loadingRequest());
    try {
      const { data } = await axios.get("/v1/user/plan/current", {
        headers: {
          Authorization: `Bearer ${getstate().user.token}`,
        },
      });

      dispatch(planActions.loadPlanSuccess(data));
    } catch (err) {
      dispatch(planActions.loadPlanFailure(err));
    }
  };
};

export const subscribePlanInit = () => {
  return async (dispatch) => {
    dispatch(planActions.loadingRequest());
  };
};

export const subscribePlanSuccess = (data) => {
  return async (dispatch) => {
    dispatch(planActions.updatePlanSuccess(data));
  };
};

export const subscribePlanFaliure = (error) => {
  return async (dispatch) => {
    dispatch(planActions.updatePlanFailure(error));
  };
};

export const subscribePlanUpdateFailure = (error) => {
  return async (dispatch) => {
    dispatch(planActions.updatePlanDataFailure(error));
  };
};

export const hidePlanErrorMsg = () => {
  return async (dispatch) => {
    dispatch(planActions.hideErrorMsg());
  };
};
