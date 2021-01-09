export const BACKEND_URL = "https://tgif-secret-family-recipes-api.herokuapp.com";

export const CUISINE_CATEGORIES = ["soup", "salad", "pasta", "rice", "sandwich", "wrap"];

export const DETAIL_INITIAL_OBJ = {
    ingredients: [""],
    steps: [""],
    name: "",
    category: "",
    description: "",
};

export const INNITIAL_SEARCH_OBJ ={
    byTitle: "",
    byCategory: "",
};

export const INITIAL_USER_DATA ={
    username: "",
    password: "",
}

export const detailFormat = (data) => {
    const detailObj = {
        ingredients: data.ingredients.map(ingr => ingr.ingredient),
        steps: data.steps.map(step => step.step),
        name: data.recipe.recipe,
        category: data.recipe.category,
        description: data.recipe.description,
    };
    return detailObj;
}