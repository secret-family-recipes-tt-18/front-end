import React, { useState } from  'react';
import axios from "axios";
//import { useHistory } from "react-router-dom";

//import axiosWithAuth from './../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';


const initialUserData = {
    username: "",
    password: ""
  };

const Login = (props) => {

   // const { push } = useHistory();

    const [userData, setUserData] = useState(initialUserData);


    const changeHandle = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    }

    const submitHandle = (event) => {
        event.preventDefault();
        axios
        .post(`${BACKEND_URL}/api/auth/login/login`, userData)
        .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", userData.username);
        })
        .catch(err => {
            console.log("Error:",err);
        });
    }

    return ( <div className='login-body'>
    <h1>Log In</h1>
    <form onSubmit={submitHandle}>
      <input
        name='username'
        type='text'
        placeholder='Username'
        value={userData.username}
        onChange={changeHandle}
      />
      <input
        name='password'
        type='password'
        placeholder='Password...'
        value={userData.password}
        onChange={changeHandle}
      />
      <button>Submit...</button>
    </form>
  </div>)
}

export default Login;