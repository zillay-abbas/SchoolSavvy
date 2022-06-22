import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../../../App/axios";

import "./Package.css";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribePlanFaliure,
  subscribePlanInit,
  subscribePlanSuccess,
  subscribePlanUpdateFailure,
} from "../../../../App/Redux/Action/planAction";
import { Spinner } from "react-bootstrap";
import ShowToast from "../../../../App/Toast";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      padding: "50px !important",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const Package = ({ subID, interval, payment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { detail, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading, isDialog, msg } = useSelector((state) => state.plan);

  const handlePayment = async () => {
    dispatch(subscribePlanInit());

    if (!stripe || !elements) {
      return;
    }
    const res = await axios.post(
      "/v1/user/plan/subscribe",
      { email: detail.email, amount: payment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const clientSecret = res.data["client_secret"];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: detail.email,
        },
      },
    });
    console.log(result);

    if (result.error) {
      dispatch(subscribePlanFaliure(result.error));
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        console.log("Money is in the bank!");

        try {
          const res = await axios.post(
            "/v1/user/plan/subscriptionUpdate",
            { userId: detail.id, planId: subID },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(subscribePlanSuccess(res));
        } catch (error) {
          dispatch(subscribePlanUpdateFailure(error));
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center top-mr">
      <div className="card-wraper card-cont">
        <div className="tab-content">
          <div id="credit-card" className="tab-pane fade show active pt-3">
            {/* <form> */}{" "}
            <label for="username">
              <h6>Card Owner</h6>
            </label>{" "}
            <input
              type="text"
              name="name"
              placeholder="Card Owner Name"
              required=""
              className="form_control"
              autoComplete="off"
            />
            <label htmlFor="cardNumber">
              <h6>Card details</h6>
            </label>
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <div className="card-foter">
              <Currency quantity={payment} currency="PKR" /> per {interval}
            </div>
            <div className="card-foter">
              <button
                type="submit"
                className="subscribe btn btn-primary btn-block "
                onClick={handlePayment}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &#160; Loading...
                  </>
                ) : (
                  <>Pay</>
                )}
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
      <ShowToast show={isDialog} msg={msg} from={"plan"}/>
    </div>
  );
};
