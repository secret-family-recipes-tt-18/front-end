import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import { RecipesContext } from '../contexts/RecipesContext';

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL, DETAIL_INITIAL_OBJ } from '../utils/util';

import IngredientInput from './IngredientInput';
import StepInput from './StepInput';

import newRecipeShema from "./newRecipeShema";

const initialUserData = {
  name: "",
  category: "",
};

const NewRecipe = () => {

  const { push } = useHistory();

  //hooks
  const [userError, setUserError] = useState(initialUserData);
  const [disabled, setDisabled] = useState(true);
  const { categoriesHook, newRecipeHook, pageLoadingHook } = useContext(RecipesContext);
  const categories = categoriesHook.value;
  const newRecipe = newRecipeHook.value;
  const setNewRecipe = newRecipeHook.func;
  const pageLoading = pageLoadingHook.value;
  const setPageLoading = pageLoadingHook.func;
  
  useEffect(() => {
    console.log(userError);
    newRecipeShema
      .isValid(newRecipe)
      .then((valid) => {
        setDisabled(!valid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newRecipe, userError]);

  const handleSetError = (name, value) => {
    yup
      .reach(newRecipeShema, name)
      .validate(value)
      .then(() => setUserError({ ...userError, [name]: "" }))
      .catch((err) => {
        setUserError({ ...userError, [name]: err.errors[0] });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
    handleSetError(name, value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setPageLoading(true);
    axiosWithAuth()
    .post(`${BACKEND_URL}/api/cook`, newRecipe)
    .then(res => {
      //console.log(res);
      setPageLoading(false);
      setNewRecipe(DETAIL_INITIAL_OBJ);
      push('/myrecipes');
    })
    .catch(err => {
      console.log(err)
    });
  };

  let categoryOptions = categories.map((category) => (
    <option key={category}>{category}</option>
  ));


    return(<div className="form">
        <form onSubmit={handleSubmit}>
        <div className='newItem-label'>
          <label htmlFor='name'>
            <input
              name='name'
              type='text'
              id='name'
              placeholder='Recipe Name'
              onChange={handleChange}
              value={newRecipe.name}
            />
          </label>
        </div>
        <div>{userError.name}</div>
        <div className="newItem-label">
          <label className="label-text">
            Category:
            <select
              onChange={handleChange}
              value={newRecipe.category}
              name='category'
              id='category'
            >
              <option key=''>---Select A Category---</option>
              {categoryOptions}
            </select>
          </label>
        </div>
        <div>{userError.category}</div>
        <div className="newItem-label">
          <label htmlFor='description'></label>
          <textarea
            name='description'
            id='description'
            placeholder='description'
            value={newRecipe.description}
            onChange={handleChange}
            rows='5'
            cols='50'
          ></textarea>
        </div>
        <div>
          ingredients:
          {newRecipe.ingredients.map((ingredient, i) => {
            return <IngredientInput key={i} position={i}/>
          })}
        </div>
        <div>
          steps:
          {newRecipe.steps.map((step, i) => {
            return <StepInput key={i} position={i}/>
          })}
        </div>
        <button disabled={pageLoading || disabled}>Submit</button>
        {pageLoading ? <div>Loading</div> : null}
        {console.log(pageLoading || disabled)}
      </form>
    </div>)
};

export default NewRecipe;