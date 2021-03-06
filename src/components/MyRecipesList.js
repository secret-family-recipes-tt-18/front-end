import React, { useContext, useEffect} from 'react';
import { useHistory } from "react-router-dom";

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';

import Recipe from '../components/Recipe';
import Search from '../forms/Search';

const MyRecipesList = () => {

    const { push } = useHistory();

    //hooks
    const { recipesHook } = useContext(RecipesContext);
    const setRecipes = recipesHook.func;

    //effects
    useEffect(() => {
        axiosWithAuth()
        .get(`${BACKEND_URL}/api/cook`)
        .then(res => {
            const recipesByUserID = res.data.filter(recipe => recipe.user_id === parseInt(localStorage.getItem('user_id')));
            setRecipes(recipesByUserID);
            localStorage.setItem("recipes_before_search", JSON.stringify(recipesByUserID));
        })
        .catch(err => {
            console.log("Error:", err);
        });
    }, [setRecipes]);

    return (
    <div className="recipe-body">
        <div>
            {recipesHook.value.map((recipe, i) => <Recipe key={i} name={recipe.recipe} category={recipe.category} id={recipe.recipe_id}/>)}
        </div>
        <button onClick={()=>{push('/new-recipe')}}>Add New Recipe</button>
        <Search beforeSearch={JSON.parse(localStorage.getItem("recipes_before_search"))}/>
        <h1 className="h1-recipes"> {localStorage.getItem('username')}'s Recipes</h1>
    </div>
    )
}

export default MyRecipesList;