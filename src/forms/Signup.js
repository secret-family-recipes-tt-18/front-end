import * as yup from "yup";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { RecipesContext } from "../contexts/RecipesContext";

import { BACKEND_URL } from "../utils/util";
import loginShema from "./loginShema";
const initialFormValues = {
  username: "",
  password: "",
};
const Signup = (props) => {
  const { push } = useHistory();
  const [userError, setUserError] = useState(initialFormValues);
  //hooks
  const [formValues, setFormValues] = useState(initialFormValues);
  const { pageLoadingHook } = useContext(RecipesContext);
  const [disabled, setDisabled] = useState(true);
  const changeHandle = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    handleSetError(name, value);
  };

  const submitHandle = (event) => {
    event.preventDefault();
    pageLoadingHook.func(true);
    axios
      .post(`${BACKEND_URL}/api/auth/register`, formValues)
      .then((res) => {
        //console.log(res);
        pageLoadingHook.func(false);
        push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(userError);
    loginShema
      .isValid(formValues)
      .then((valid) => {
        setDisabled(!valid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formValues]);
  const handleSetError = (name, value) => {
    yup
      .reach(loginShema, name)
      .validate(value)
      .then(() => setUserError({ ...userError, [name]: "" }))
      .catch((err) => {
        setUserError({ ...userError, [name]: err.errors[0] });
      });
  };
  return (
    <div className="signup-body">
      <div className="input-square">
        <h1 className="h1-input">Sign Up</h1>
        <form onSubmit={submitHandle}>
          <div className="userin">
            <input
              name="username"
              type="text"
              placeholder="username"
              value={formValues.username}
              onChange={changeHandle}
            />
          </div>
          
          <div>{userError.username}</div>
          
          <div>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={formValues.password}
              onChange={changeHandle}
            />
          </div>
          <div>{userError.password}</div>
          <button className="submit-b">Sign up</button>

          {pageLoadingHook.value ? <div>Loading</div> : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
