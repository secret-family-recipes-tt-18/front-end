import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipesContext } from '../contexts/RecipesContext';

const Dashboard = (props) => {

    const { push } = useHistory();

    //hooks
    const { loggedInHook } = useContext(RecipesContext);

    //effects


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        loggedInHook.func(false);
        push('/');
        console.log(loggedInHook.isLoggedIn);
    }

    return (   <section>
        <div className="dash">
            <div className="header">
                <h1>Welcome, {localStorage.getItem('username')}</h1>
            </div>
        </div>
        <div className='button-contain'>
        <button className='dashboard-button' onClick={()=> {push('/myrecipes')}}>My recipes</button>
        <button className='dashboard-button' onClick={logout}>Log Out</button>
        </div>
    </section>)
}

export default Dashboard;