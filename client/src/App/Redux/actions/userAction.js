import * as actionType from "../constants/userConstant";
import axios from "../../axios";

export const loginUser =
  (email, password, userType) => async (dispatch, getstate) => {
    try {
      dispatch({
        type: actionType.LOGIN_REQ,
      });

      const { data } = await axios.post(
        "/v1/user/login",
        { email, password, userType },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: actionType.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.log();
      alert(error.response.data.msg);
      dispatch({
        type: actionType.LOGIN_FAILURE,
        payload: error.response.data,
      });
    }
  };

export const loadDashboard = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: actionType.DASHBOARD_REQ,
    });

    console.log(`tokennn: ${getstate().user.token}`);
    
    const { data } = await axios.get("/v1/user/dashboard/detail", {
      headers: {
        Authorization: `Bearer ${getstate().user.token}`,
      },
    });

    dispatch({
      type: actionType.DASHBOARD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(`falii: ${error}`);

    dispatch({
      type: actionType.DASHBOARD_FAILURE,
      payload: error.response.data,
    });
  }
};
