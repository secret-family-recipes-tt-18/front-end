import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { BACKEND_URL } from "../utils/util";

import { RecipesContext } from "../contexts/RecipesContext";

//import * as yup from 'yup'

/*const validationShema = yup.object().shape({
  username: yup
  .string()
  .label("Username")
  .email()
  .required(),
  password: yup
  .string()
  .label("Password")
  .required()
  .min(8,"Too short...")
  .max(20,"Too big...")
})*/



const initialUserData = {
  username: "",
  password: "",
};

const Login = (props) => {
  const { push } = useHistory();

  //hooks
  const [userData, setUserData] = useState(initialUserData);
  const { loggedInHook, pageLoadingHook } = useContext(RecipesContext);
  const [error401, setError401] = useState(false);

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandle = (event) => {
    event.preventDefault();
    pageLoadingHook.func(true);
    axios
      .post(`${BACKEND_URL}/api/auth/login`, userData)
      .then((res) => {
        console.log(res);
        setError401(false);
        pageLoadingHook.func(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.userId);
        localStorage.setItem("username", userData.username);
        loggedInHook.func(!loggedInHook.value);
        push("/myrecipes");
      })
      .catch((err) => {
        console.log(err);
        pageLoadingHook.func(false);
        if (err.response.status === 401) {
          setError401(true);
        }
      });
  };

  return (
    <div className="login-body">
      <div>
        <h1>Log In</h1>
        <form onSubmit={submitHandle}>
          <div className="userin">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password..."
              value={userData.password}
              onChange={changeHandle}
            />
          </div>
          <button className="submit-b">Submit...</button>
          <button
            onClick={() => {
              push("/signup");
            }}
          >
            {" "}
            Sign-Up
          </button>
          {pageLoadingHook.value ? <div>Loading</div> : null}
          {error401 ? <div>Wrong username or password</div> : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
