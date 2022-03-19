import * as actionTypes from "../constants/userConstant";

const tokenFromLocalStorage = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const userReducer = (
  state = { token: tokenFromLocalStorage },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQ:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        token: null,
        msg: action.payload.msg,
      };
    case actionTypes.DASHBOARD_REQ:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: action.payload,
      };
    case actionTypes.DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        dashboard: { msg: action.msg },
      };

    default:
      return state;
  }
};
