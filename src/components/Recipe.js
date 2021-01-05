import React from 'react';
import { useHistory } from 'react-router-dom';

const Recipe = (props) => {

    const {name, category, id} = props;

    const { push } = useHistory();

    return (<div>
        <h2>Name: {name}</h2>
        <h3>Category: {category}</h3>
        <button onClick={()=>{push(`/item/${id}`)}}>Detail</button>
    </div>)
}

export default Recipe;