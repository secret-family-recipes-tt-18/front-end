import React from "react";
import { useHistory } from 'react-router-dom';

import bg from "../images/bg.jpg";

const Landing = () => {
    
    const { push } = useHistory();

    return (<div className="landing">
        <div className="limage">
            <img src={bg} alt="background"/>
        </div>
        <div className="lcontain">
            <button onClick={()=>{push('/login')}}>Login</button>
            <button onClick={()=>{push('/signup')}}>Sign Up</button>
        </div>
    </div>)
}

export default Landing;