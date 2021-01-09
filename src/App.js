// libraries
import React, { useEffect } from "react";
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

import useContextHook from './hooks/contextHook';

function App() {
  //hooks
  const contextValue = useContextHook();
  const isLoggedIn = contextValue.loggedInHook.value;
  const setIsLoggedIn = contextValue.loggedInHook.func;

  //effects
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
    console.log("Loged");
  }, [isLoggedIn,setIsLoggedIn]);

  useEffect(() => {
    console.log("Context:", contextValue)
  }, [contextValue]);
  

  return (
    <RecipesContext.Provider
      value ={contextValue}
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
