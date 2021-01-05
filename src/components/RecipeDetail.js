import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';

const RecipeDetail = () => {

    const params = useParams();
    const { push } = useHistory();

    //hooks
    const { detailRecipeHook } = useContext(RecipesContext);
    const setDetail = detailRecipeHook.func;
    const detail = detailRecipeHook.value;

    const detailFormat = (data) => {
        const detailObj = {
            ingredients: data.ingredients.map(ingr => ingr.ingredient),
            steps: data.steps.map(step => step.step),
            name: data.recipe.recipe,
            category: data.recipe.category,
            description: data.recipe.description,
        };
        return detailObj;
    }

    //effects
    useEffect(() => {
        axiosWithAuth()
        .get(`${BACKEND_URL}/api/cook/${params.id}`)
        .then(res => {
            //console.log(res.data);
            setDetail(detailFormat(res.data));
        })
        .catch(err => {
            console.log(err);
        });
    }, [setDetail, params.id]);

    const onDelete = () => {
        axiosWithAuth()
        .delete(`${BACKEND_URL}/api/cook/${params.id}`)
        .then(res => {
            console.log(res);
            push('/myrecipes');
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    return(<div>
        <h1>{detail.name}</h1>
        <h2>{detail.category}</h2>
        <div>
            <p>{detail.description}</p>
        </div>
        <div>
            ingredients:
            <ul>
                {detail.ingredients.map(( ing, i ) => <li key={i}>{ing}</li>)}
            </ul>
        </div>
        <div>
            steps:
            <ul>
                {detail.steps.map(( step, i ) => <li key={i}>{step}</li>)}
            </ul>
        </div>
        <button onClick={()=>{push(`/edit-item/${params.id}`)}}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={()=>{push('/myrecipes')}}>Go Back</button>
    </div>)
}

export default RecipeDetail;