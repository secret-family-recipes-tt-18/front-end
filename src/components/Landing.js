import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';

import bg from "../images/bg.jpg";

import { RecipesContext } from '../contexts/RecipesContext';

const Landing = () => {
    
    const { push } = useHistory();

    //hooks
    const { loggedInHook } = useContext(RecipesContext);

    return (<div className="landing">
        <div className="limage">
            <img src={bg} alt="background"/>
        </div>
        {loggedInHook.isLoggedIn ? null : 
            <div className="lcontain">
                <button onClick={()=>{push('/login')}}>Login</button>
                <button onClick={()=>{push('/signup')}}>Sign Up</button>
            </div>
        }
    </div>)
}

export default Landing;