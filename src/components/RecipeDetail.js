import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL, detailFormat } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';

import AlertDialog from './AlertDialog';

const RecipeDetail = () => {

    const params = useParams();
    const { push } = useHistory();

    //hooks
    const { detailRecipeHook } = useContext(RecipesContext);
    const setDetail = detailRecipeHook.func;
    const detail = detailRecipeHook.value;

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

    return(<div className="recipe-details">
        <h1>Title: {detail.name}</h1>
        <h2>Category: {detail.category}</h2>
        <div>
            <p>Description {detail.description}</p>
        </div>
        <div className="ingredients">
            Ingredients:
            <ul>
                {detail.ingredients.map(( ing, i ) => <li key={i}>{ing}</li>)}
            </ul>
        </div>
        <div className="steps">
            Steps:
            <ul>
                {detail.steps.map(( step, i ) => <li key={i}>{step}</li>)}
            </ul>
        </div>
        <button onClick={()=>{push(`/edit-item/${params.id}`)}}>Edit</button>
        {/*<button onClick={onDelete}>Delete</button>*/}
        <AlertDialog deleteHandler={onDelete}/>
        <button onClick={()=>{push('/myrecipes')}}>Go Back</button>
    </div>)
}

export default RecipeDetail;