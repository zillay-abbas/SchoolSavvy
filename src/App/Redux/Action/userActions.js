import axios from "../../axios";

import { userActions } from "../Slice/userSlice";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(userActions.loadingRequest());

    try {
      const { data } = await axios.post(
        "/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      dispatch(userActions.loginSuccess(data));
    } catch (err) {
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
      dispatch(userActions.loginFailure(err.response));
    }
  };
};


export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("user");
    dispatch(userActions.logout());
  };
};
