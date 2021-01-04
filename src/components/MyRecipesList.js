import React, { useContext, useEffect} from 'react';

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';

import Recipe from '../components/Recipe';

const MyRecipesList = () => {

    //hooks
    const { recipesHook } = useContext(RecipesContext);
    const setRecipes = recipesHook.func;

    //effects
    useEffect(() => {
        axiosWithAuth()
        .get(`${BACKEND_URL}/api/cook`)
        .then(res => {
            setRecipes(res.data);
        })
        .catch(err => {
            console.log("Error:", err);
        });
    }, [setRecipes]);

    return (<div>
        <h1>{localStorage.getItem('username')}'s Recipes</h1>
        <div>
            {recipesHook.value.map((recipe, i) => <Recipe key={i} name={recipe.recipe} category={recipe.category}/>)}
        </div>
    </div>)
}

export default MyRecipesList;