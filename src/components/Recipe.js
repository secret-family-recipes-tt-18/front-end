import React from 'react';

const Recipe = (props) => {

    const {name, category} = props;

    return (<div>
        <h2>Name: {name}</h2>
        <h3>Category: {category}</h3>
    </div>)
}

export default Recipe;