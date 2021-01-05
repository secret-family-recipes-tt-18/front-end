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

//utils
import PrivateRoute from "./components/PrivateRoute";

import { CUISINE_CATEGORIES } from './utils/util';

function App() {
  //hooks
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState({});
  const [categories, setCategories] = useState(CUISINE_CATEGORIES);

  //effects
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    //console.log("Loged");
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
        categoriesHook: {
          value: categories,
          func: setCategories
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
