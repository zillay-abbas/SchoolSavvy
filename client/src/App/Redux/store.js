import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

const middleware = [thunk];

const INITIAL_STATE = {
};

const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
