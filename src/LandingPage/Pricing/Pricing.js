import React from 'react'

import HomeFooter from "../Footer/HomeFooter";
import HomeHeader from "../Header/HomeHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import './Pricing.css';

const Pricing = () => {
    return (
        <div>
            <HomeHeader />
            {/* Head */}

            <div>
                <h1 className="g_h11"> School Savvy Pricing Plan </h1>
                <p className="g_text1">Simple and straight forward School Savvy pricing plans for any school size. No hidden charges, no extra fees plus FREE setup.</p>
            </div>

            {/* Packages */}
            <div className="g_container">
                <div className="g_wrap">
                <div className="g_card" id="card-1">
                    <div  className="g_card-body">
                    
                        <div className="g_form-header"><h1>FREE (Trail Base)</h1></div>
                            <h1 className="g_price">0.0$</h1>
                            <t className="g_pricetxt">Monthly</t>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> 50 Students
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> 5 Teachers
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> Basic Modules
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> Email Support
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> "Powered by School Savvy"
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> URL
                            </div>
                            <div className="g_packg">
                                <i className="g_check-circle" />
                                <FontAwesomeIcon icon={faCheckCircle} color="black" /> 1 GB Storage
                            </div>
                        </div>
                        <div className="g_form-group">
                            <button type="submit">FREE SIGNUP</button>
                        </div>

                    </div>
                    <div className="g_card" id="card-2">
                        <div  className="g_card-body">
                            <div className="g_form-header">
                                <h1>YEARLY (Unlimited)</h1>
                            </div>

                        <h1 className="g_price">100$</h1>
                        <t className="g_pricetxt">Year</t>
                        <h4 className="g_pricetxt">245$ for setup</h4>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> 600 Students
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Unlimited Teachers
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Basic + Advance Modules
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Tickets + Email Support
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> "Your Own Domain"
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />                                
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> URL
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Unlimited Storage
                        </div>
                        </div>
                        <div className="g_form-group">
                            <button type="submit">YEARLY SIGNUP</button>
                        </div>

                    </div>
                    <div className="g_card" id="card-3">
                        <div  className="g_card-body">
                            <div className="g_form-header">
                                <h1>MONTHLY</h1>
                            </div>

                        <h1 className="g_price">39.5$</h1>
                        <t className="g_pricetxt">Monthly</t>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> 600 Students
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Unlimited Teachers
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Basic + Advance Modules
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> Tickets + Email Support
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> "Your Own Domain"
                        </div>
                        <div className="g_packg">
                            <i className="g_check-circle" />                                
                            <FontAwesomeIcon icon={faCheckCircle} color="black" /> URL
                        </div>
                        </div>
                        <div className="g_form-group">
                            <button type="submit">Monthly SIGNUP</button>
                        </div>

                    </div>
                </div>
                </div>
            <HomeFooter />            
        </div>
    )
}

export default Pricing
