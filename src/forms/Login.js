import React, { useContext, useState } from  'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//import axiosWithAuth from './../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';


const initialUserData = {
    username: "",
    password: ""
  };

const Login = (props) => {

    const { push } = useHistory();

    //hooks
    const [userData, setUserData] = useState(initialUserData);
    const [loading, setLoading] = useState(false);
    const { loggedInHook } = useContext(RecipesContext);
    const [error401, setError401] = useState(false);

    const changeHandle = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    }

    const submitHandle = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
        .post(`${BACKEND_URL}/api/auth/login`, userData)
        .then(res => {
            console.log(res);
            setError401(false);
            setLoading(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", userData.username);
            loggedInHook.func(!loggedInHook.value);
            push('/myrecipes');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 401) {
              setError401(true);
            }
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
      {loading ? <div>Loading</div> : null}
      {error401 ? <div>Wrong username or password</div> : null}
    </form>
  </div>)
}

export default Login;