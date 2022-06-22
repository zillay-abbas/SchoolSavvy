import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./App/Redux/store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import "bootstrap/dist/css/bootstrap.min.css";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const options = {
  clientSecret: process.env.SECRET_KEY,
};

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise} options={options}>
        <App />
      </Elements>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
