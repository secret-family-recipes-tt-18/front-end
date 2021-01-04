// libraries
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//styles
import './App.css';

// contexts
import { RecipesContext } from "./contexts/RecipesContext";

//components
import Landing from './components/Landing';
import Login from './forms/Login';
import Signup from './forms/Signup';

//utils
//import PrivateRoute from "./components/PrivateRoute";
//import axiosWithAuth from "./utils/axiosWithAuth";

function App() {
  //hooks
  //const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <RecipesContext.Provider
      value ={[]}
    >
      <div className='App'>
        <Router>
          <Switch>
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
