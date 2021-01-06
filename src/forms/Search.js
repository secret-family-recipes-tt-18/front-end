import React, { useContext } from 'react';

import { RecipesContext } from '../contexts/RecipesContext';

const Search = (props) => {

    //props
    const { beforeSearch } = props;

    //hooks
    const { searchHook, recipesHook, categoriesHook } = useContext(RecipesContext);
    const search = searchHook.value;
    const setSearch = searchHook.func;
    const recipes = recipesHook.value;
    const setRecipes = recipesHook.func;
    const categories = categoriesHook.value;

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

    const handlerSearchByCategory = (e) => {
        e.preventDefault();
        const tempRecipes = [...recipes].filter(recipe => recipe.category === search.byCategory);
        setRecipes(tempRecipes);
    }

    const handlerReset = (e) => {
        e.preventDefault();
        setRecipes(beforeSearch);
    }

  let categoryOptions = categories.map((category) => (
    <option key={category}>{category}</option>
  ));

    return (<div>
        <form>
            <input
                type="text"
                name="byTitle"
                value={search.byTitle}
                onChange={handlerChange}
            />
            <button onClick={handlerSearchByTitle}>Search by Title</button>
            <button onClick={handlerReset}>Reset</button>
            <select
              onChange={handlerChange}
              value={search.byCategory}
              name='byCategory'
            >
              <option key=''>---Select A Category---</option>
              {categoryOptions}
            </select>
            <button onClick={handlerSearchByCategory}>Search by Category</button>
            <button onClick={handlerReset}>Reset</button>
        </form>
    </div>);
};

export default Search;