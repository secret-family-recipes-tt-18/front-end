import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { BACKEND_URL, INITIAL_USER_DATA } from "../utils/util";

import { RecipesContext } from "../contexts/RecipesContext";
import loginShema from "../validation/loginShema";
import useValidation from '../hooks/validationHook';


const Login = (props) => {
  const { push } = useHistory();

  //hooks
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const { loggedInHook, pageLoadingHook, buttonDisabledHook, error401Hook} = useContext(RecipesContext);
  const disabled = buttonDisabledHook.value;
  const error401 = error401Hook.value;
  const setError401 = error401Hook.func;
  const {userError, handleSetError} = useValidation(INITIAL_USER_DATA, loginShema, userData);

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    handleSetError(name, value);
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
      <div className="input-square">
        <h1 className="h1-input">Log In</h1>
        <form onSubmit={submitHandle}>
          <div className="user-in">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={changeHandle}
            />
          </div>
          <div>{userError.username}</div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password..."
              value={userData.password}
              onChange={changeHandle}
            />
          </div>
          <div>{userError.password}</div>
          <button disabled={disabled} className="submit-b">
            Submit...
          </button>
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
