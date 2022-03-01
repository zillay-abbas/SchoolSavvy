import React, { useState } from "react";
import Cards from "react-credit-cards";
import CreditCardInput from "react-credit-card-input";

import "./Package.css";
import "react-credit-cards/es/styles-compiled.css";

export const Package = () => {
  var [state, setState] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const handleInputFocus = (e) => {
    setState((state) => ({ ...state, focus: e.target.name }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="d-flex justify-content-center top-mr">
      <div className="card-wraper card-cont">
       
        <Cards
          cvc={state.cvc}
          expiry={state.expiry}
          focused={state.focus}
          name={state.name}
          number={state.number}
        />

        <div className="tab-content">
          <div id="credit-card" className="tab-pane fade show active pt-3">
            <form>
              <div className="form-grp">
                {" "}
                <label for="username">
                  <h6>Card Owner</h6>
                </label>{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Card Owner Name"
                  required=""
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  autoComplete="off"
                />
              </div>
              <label htmlFor="cardNumber">
                <h6>Card details</h6>
              </label>
              <div className="card-wrap">
                <CreditCardInput
                  cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
                    <input
                      {...props}
                      name="cvc"
                      onChange={handleCardCVCChange((e) => {
                        handleInputChange(e);
                      })}
                      onFocus={handleInputFocus}
                    />
                  )}
                  cardExpiryInputRenderer={({
                    handleCardExpiryChange,
                    props,
                  }) => (
                    <input
                      {...props}
                      name="expiry"
                      onChange={handleCardExpiryChange((e) => {
                        handleInputChange(e);
                      })}
                      onFocus={handleInputFocus}
                    />
                  )}
                  cardNumberInputRenderer={({
                    handleCardNumberChange,
                    props,
                  }) => (
                    <input
                      {...props}
                      name="number"
                      onChange={handleCardNumberChange((e) => {
                        handleInputChange(e);
                      })}
                      onFocus={handleInputFocus}
                    />
                  )}
                />
              </div>

              <div className="card-foter">
                {" "}
                <button
                  type="button"
                  className="subscribe btn btn-primary btn-block "
                >
                  {" "}
                  Confirm Payment{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
