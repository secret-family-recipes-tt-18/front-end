import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { RecipesContext } from '../contexts/RecipesContext';

import { DETAIL_INITIAL_OBJ } from '../utils/util';

const Dashboard = (props) => {

    const { push } = useHistory();

    //hooks
    const { loggedInHook, newRecipeHook } = useContext(RecipesContext);

    const handlerMyRecipesClick = () => {
        newRecipeHook.func(DETAIL_INITIAL_OBJ);
        push('/myrecipes');
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('recipes_before_search');
        newRecipeHook.func(DETAIL_INITIAL_OBJ);
        loggedInHook.func(false);
        push('/');
        console.log(loggedInHook.isLoggedIn);
    }

    return (   <section>
        
        <div className="dash">
            <div className="header">
                <h1 className="h1-user">Welcome, {localStorage.getItem('username')}</h1>
            </div>
        
        <div className='button-contain'>
        <button className='dashboard-button' onClick={handlerMyRecipesClick}>My recipes</button>
        <button className='dashboard-button' onClick={logout}>Log Out</button>
        </div>
        </div>
    </section>)
}

export default Dashboard;