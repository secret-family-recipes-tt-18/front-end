import React, { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

const IngredientInput = (props) => {

    //props
    const { position } = props;

    //hooks
    const { newRecipeHook } = useContext(RecipesContext);
    const newRecipe = newRecipeHook.value;
    const setNewRecipe = newRecipeHook.func;
    const newSteps = newRecipe.steps;


    const handlerChange = (event) => {
        const { value } = event.target;
        let changes = [...newSteps];
        changes[position] = value;
        setNewRecipe({...newRecipe, steps: changes});
    }

    const handlerAddClick = (event) => {
        event.preventDefault();
        setNewRecipe({...newRecipe, steps: [...newSteps, ""]});
    }

    const handlerRemoveClick = (event) => {
        event.preventDefault();
        const positionValue = newSteps[position];
        const withoutElement = newSteps.filter(step => step !== positionValue);
        if(!withoutElement.length) {withoutElement.push("")}
        setNewRecipe({...newRecipe, steps: withoutElement});
    }

    return (<div>
        <input
            type="text"
            name="ingridient"
            value={newSteps[position]}
            onChange={handlerChange}
        />
        <button onClick={handlerAddClick}>Add More</button>
        <button onClick={handlerRemoveClick}>Remove this</button>
    </div>);
};

export default IngredientInput;