import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

import axiosWithAuth from '../utils/axiosWithAuth';
import { BACKEND_URL } from '../utils/util';

import { RecipesContext } from '../contexts/RecipesContext';

const RecipeDetail = () => {

    const params = useParams();

    //hooks
    const { detailRecipeHook } = useContext(RecipesContext);
    const setDetail = detailRecipeHook.func;
    const detail = detailRecipeHook.value;

    useEffect(() => {
        axiosWithAuth()
        .get(`${BACKEND_URL}/api/cook/${params.id}`)
        .then(res => {
            //console.log(res.data);
            setDetail(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [setDetail, params.id]);

    return(<div>
        {console.log(detail)}
    </div>)
}

export default RecipeDetail;