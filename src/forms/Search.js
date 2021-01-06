import React, { useContext } from 'react';

import { RecipesContext } from '../contexts/RecipesContext';

const Search = () => {

    //hooks
    const { searchHook, recipesHook } = useContext(RecipesContext);
    const search = searchHook.value;
    const setSearch = searchHook.func;
    const recipes = recipesHook.value;
    const setRecipes = recipesHook.func;

    const handlerChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setSearch({...search, [name]:value});
    }

    const handlerSearchByTitle = (e) => {
        e.preventDefault();
        const tempRecipes = [...recipes].filter(recipe => recipe.recipe === search.byTitle);
        setRecipes(tempRecipes);
    }

    return (<div>
        <form>
            <input
                type="text"
                name="byTitle"
                value={search.byTitle}
                onChange={handlerChange}
            />
            <button onClick={handlerSearchByTitle}>Search by Title</button>
        </form>
    </div>);
};

export default Search;