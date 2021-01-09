import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { RecipesContext } from "../contexts/RecipesContext";

import { BACKEND_URL, INITIAL_USER_DATA } from "../utils/util";
import loginShema from "../validation/loginShema";
import useValidation from '../hooks/validationHook';


const Signup = (props) => {
  const { push } = useHistory();
  //hooks
  const [formValues, setFormValues] = useState(INITIAL_USER_DATA);
  const { pageLoadingHook, buttonDisabledHook } = useContext(RecipesContext);
  const disabled = buttonDisabledHook.value;
  const {userError, handleSetError} = useValidation(INITIAL_USER_DATA, loginShema, formValues);



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
          <button className="submit-b" disabled={disabled}>Sign up</button>

          {pageLoadingHook.value ? <div>Loading</div> : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
