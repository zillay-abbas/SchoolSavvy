import React from "react";
import axios from "axios";

import HomeFooter from "../components/HomeFooter";
import HomeHeader from "../components/HomeHeader";

import "./SignIn.css";

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const updateValues = e => {
    setUsername(e.target.value);
  }

  
  function addUser() {
    axios
      .post(, {
        title: "Hello World!",
        body: "This is a new post.",
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  return (
    <div className="frm-clr">
      {/* Header */}
      <HomeHeader />

      <div className="form ">
        <div className="form-panel one">
          <div className="form-header">
            <h1>Register Account</h1>
          </div>

          <div className="form-content">
            <form>
              <div className="form-group">
                <label for="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  required="required"
                  onChange={}
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label for="cpassword">Confirm Password</label>
                <input
                  id="cpassword"
                  type="password"
                  name="cpassword"
                  required="required"
                />
              </div>
              <div className="form-group">
                <label for="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required="required"
                />
              </div>
              <div className="form-group">
                <button type="submit" onClick={addUser}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
};

export default SignUp;
