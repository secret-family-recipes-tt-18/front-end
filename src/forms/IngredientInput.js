import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

const IngredientInput = (props) => {

    //props
    const { position } = props;

    //hooks
    const { newRecipeHook } = useContext(RecipesContext);
    const newRecipe = newRecipeHook.value;
    const setNewRecipe = newRecipeHook.func;
    const newIngredients = newRecipe.ingredients;


    const handlerChange = (event) => {
        const { value } = event.target;
        let changes = [...newIngredients];
        changes[position] = value;
        setNewRecipe({...newRecipe, ingredients: changes});
    }

    const handlerAddClick = (event) => {
        event.preventDefault();
        setNewRecipe({...newRecipe, ingredients: [...newIngredients, ""]});
    }

    const handlerRemoveClick = (event) => {
        event.preventDefault();
        const positionValue = newIngredients[position];
        const withoutElement = newIngredients.filter(ingredient => ingredient !== positionValue);
        setNewRecipe({...newRecipe, ingredients: withoutElement});
    }

    return (<div>
        <input
            type="text"
            name="ingridient"
            value={newIngredients[position]}
            onChange={handlerChange}
        />
        <button onClick={handlerAddClick}>Add More</button>
        <button onClick={handlerRemoveClick}>Remove this</button>
    </div>);
};

export default IngredientInput;