import React, { useState } from  "react";
import axios from "axios";

import { BACKEND_URL } from '../utils/util';

const initialFormValues = {
    username: "username",
    password: "password"
  };


const Signup = (props) => {
    //hooks
    const [formValues, setFormValues] = useState(initialFormValues);

    const changeHandle = (event) => {
        const { name, value } = event.target;

        setFormValues({ ...formValues, [name]: value });
    }

    const submitHandle = (event) => {
        event.preventDefault();
        axios
        .post(`${BACKEND_URL}/api/auth/login/register`,formValues)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log("Error:",err);
        });
    }

    return(<div className='signup-body'>
    <h1>Sign Up</h1>
    <form onSubmit={submitHandle}>
      <input
        name='username'
        type='text'
        placeholder='username'
        value={formValues.username}
        onChange={changeHandle}
      />
      <input
        name='password'
        type='password'
        placeholder='password'
        value={formValues.password}
        onChange={changeHandle}
      />
      <button>Submit</button>
    </form>
  </div>)
}

export default Signup;