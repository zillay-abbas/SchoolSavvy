import React from "react";

import HomeFooter from "./HomeFooter.js";
import HomeHeader from "./HomeHeader.js";

const ContactusComponent = () => {
  return (
    <div className="frm-clr">
      {/* Header */}
      <HomeHeader />
      <section className="ftco-section bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7 d-flex align-items-stretch">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3>Get in touch</h3>
                      <div id="form-message-warning"></div>
                      <p id="form-message-success">
                        Your message was sent, thank you!
                      </p>
                      <form method="POST" name="contactForm">
                        <div className="row sec1">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="name"
                              placeholder="Name"
                              required="required"
                            />
                          </div>

                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              id="email"
                              placeholder="Email"
                              required="required"
                            />
                          </div>

                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="subject"
                              id="subject"
                              placeholder="Subject"
                              required="required"
                            />
                          </div>

                          <div className="form-group">
                            <textarea
                              name="message"
                              className="form-control"
                              cols="30"
                              rows="7"
                              placeholder="Message"
                              required="required"
                            ></textarea>
                          </div>

                          <div className="form-group">
                            <input
                              type="submit"
                              value="Send Message"
                              className="btn btn-primary"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 mt-5 ">
                    <div className="info-wrap text-white bg-primary w-100 p-lg-5 p-4">
                      <h3>
                        Contact us
                      </h3>
                      <div className="contactinfo">
                        <div className="box">
                          <i className="fa fa-map-marker"></i>
                          <h3>Address</h3>

                          <p>Rawalpindi,Islamabad</p>
                        </div>
                        <div className="box">
                          <i className="fa fa-phone" aria-hidden="true"></i>

                          <h3>Phone</h3>
                          <p>03072156668</p>
                        </div>
                        <div className="box">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>

                          <h3>Email</h3>
                          <p>m.arslan6845@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default ContactusComponent;