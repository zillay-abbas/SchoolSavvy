import axios from "../../axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const loginUser = (email, password, userType) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
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
      type: "loginSuccess",
      payload: data,
    });
  } catch (error) {
    // console.log();
    alert(error.response.data.msg);
    dispatch({
      type: "loginFailure",
      payload: error.response.data,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.get("/v1/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error,
    });
  }
};
