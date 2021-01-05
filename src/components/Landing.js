import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import bg from "../images/bg.jpg";

import { RecipesContext } from "../contexts/RecipesContext";

const Landing = () => {
  const { push } = useHistory();

  //hooks
  const { loggedInHook } = useContext(RecipesContext);

  return (
    <div className="landing"style={{ backgroundImage: `url(${bg})` }}>
        <h1 className="ltitle">Secret Family Recipes</h1>
        {loggedInHook.isLoggedIn ? null : (
          <div className="lcontain">
            <button
              onClick={() => {
                push("/login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                push("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      
    </div>
  );
};

export default Landing;
