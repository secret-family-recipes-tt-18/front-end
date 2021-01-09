// libraries
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//styles
import './App.css';

// contexts
import { RecipesContext } from "./contexts/RecipesContext";

//components
import Landing from './components/Landing';
import Login from './forms/Login';
import Signup from './forms/Signup';
import Dashboard from './components/Dashboard';
import MyRecipesList from './components/MyRecipesList';
import RecipeDetail from './components/RecipeDetail';
import NewRecipe from './forms/NewRecipe';
import EditRecipe from './forms/EditRecipe';

//utils
import PrivateRoute from "./components/PrivateRoute";

import { CUISINE_CATEGORIES, DETAIL_INITIAL_OBJ, INNITIAL_SEARCH_OBJ } from './utils/util';

function App() {
  //hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState(DETAIL_INITIAL_OBJ);
  const [newRecipe, setNewRecipe] = useState(DETAIL_INITIAL_OBJ);
  const [categories, setCategories] = useState(CUISINE_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [searchObject, setSearchObject] = useState(INNITIAL_SEARCH_OBJ);
  const [disabled, setDisabled] = useState(true);
  const [error401, setError401] = useState(false);

  //effects
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    console.log("Loged");
  }, [isLoggedIn]);
  

  return (
    <RecipesContext.Provider
      value ={{
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
      }}
    >
      <div className='App'>
        <Router>
          {isLoggedIn ? <Dashboard/> : null}
          <Switch>
            <PrivateRoute exact path='/myrecipes' component={MyRecipesList}/>
            <PrivateRoute exact path='/new-recipe' component={NewRecipe} />
            <PrivateRoute path='/item/:id' component={RecipeDetail} />
            <PrivateRoute path='/edit-item/:id' component={EditRecipe} />
            <Route exact path='/' component={Landing} />
            <Route path ='/login' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </Router>
      </div>
    </RecipesContext.Provider>
  );
}

export default App;
