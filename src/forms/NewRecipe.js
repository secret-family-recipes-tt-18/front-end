import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";

import { RecipesContext } from '../contexts/RecipesContext';

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL, DETAIL_INNITIAL_OBJ } from '../utils/util';



const NewRecipe = () => {

  const { push } = useHistory();

  //hooks
  const [ currentRecipe, setCurrentRecipe ] = useState(DETAIL_INNITIAL_OBJ);
  const { categoriesHook } = useContext(RecipesContext);
  const categories = categoriesHook.value;
  

  const handleChange = (event) => {

    const { name, value } = event.target;
    
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosWithAuth()
    .post(`${BACKEND_URL}/api/cook`, currentRecipe)
    .then(res => {
      console.log(res);
      push('/myrecipes');
    })
    .catch(err => {
      console.log("Error:", err)
    });
  };

  // map categories abd locations from context to options for a dropdown
  let categoryOptions = categories.map((category) => (
    <option key={category}>{category}</option>
  ));


    return(<div>
        <form onSubmit={handleSubmit}>
        <div className='newItem-label'>
          <label htmlFor='name'>
            <input
              name='name'
              type='text'
              id='name'
              placeholder='Recipe Name'
              onChange={handleChange}
              value={currentRecipe.name}
            />
          </label>
        </div>
        <div className="newItem-label">
          <label className="label-text">
            Category:
            <select
              onChange={handleChange}
              value={currentRecipe.category}
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
            value={currentRecipe.description}
            onChange={handleChange}
            rows='5'
            cols='50'
          ></textarea>
        </div>
        <div>
          ingredients:
          {}
          <button>+</button>
        </div>
        <button>Submit</button>
      </form>
    </div>)
};

export default NewRecipe;