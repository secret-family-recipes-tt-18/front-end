import { useState } from 'react';

import { CUISINE_CATEGORIES, DETAIL_INITIAL_OBJ, INNITIAL_SEARCH_OBJ } from '../utils/util';

const useContextHook = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState(DETAIL_INITIAL_OBJ);
  const [newRecipe, setNewRecipe] = useState(DETAIL_INITIAL_OBJ);
  const [categories, setCategories] = useState(CUISINE_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [searchObject, setSearchObject] = useState(INNITIAL_SEARCH_OBJ);
  const [disabled, setDisabled] = useState(true);
  const [error401, setError401] = useState(false);

  return {

    loggedInHook: {
      value: isLoggedIn,
      func: setIsLoggedIn
    },
    recipesHook: {
      value: recipes,
      func: setRecipes
    },
    detailRecipeHook: {
      value: detailRecipe,
      func: setDetailRecipe
    },
    newRecipeHook: {
      value: newRecipe,
      func: setNewRecipe
    },
    categoriesHook: {
      value: categories,
      func: setCategories
    },
    pageLoadingHook: {
      value: loading,
      func: setLoading
    },
    buttonDisabledHook: {
      value: disabled,
      func: setDisabled
    },
    searchHook: {
      value: searchObject,
      func: setSearchObject
    },
    error401Hook: {
      value: error401,
      func: setError401
    },
  };

};

export default useContextHook;