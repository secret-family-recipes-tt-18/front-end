import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { RecipesContext } from '../contexts/RecipesContext';

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL, DETAIL_INITIAL_OBJ } from '../utils/util';

import IngredientInput from './IngredientInput';
import StepInput from './StepInput';


const NewRecipe = () => {

  const { push } = useHistory();

  //hooks
  const { categoriesHook, newRecipeHook } = useContext(RecipesContext);
  const categories = categoriesHook.value;
  const newRecipe = newRecipeHook.value;
  const setNewRecipe = newRecipeHook.func;
  


  const handleChange = (event) => {

    const { name, value } = event.target;
    
    setNewRecipe({ ...newRecipe, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
    .post(`${BACKEND_URL}/api/cook`, newRecipe)
    .then(res => {
      //console.log(res);
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
        <button>Submit</button>
      </form>
    </div>)
};

export default NewRecipe;