"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    replaceLoginWithUser();
    fillRecipeHtml();
}

async function fillRecipeHtml() {
    const parameters = retrieveQueryParameters();
    const recipes = await APIgetRandomRecipes(parameters.amount);
    createRecipeCards(recipes);
}

function createRecipeCards(recipes){
    console.log(recipes);
    recipes.forEach(recipe => {

        const recipeCardTemplate = document.querySelector('#recipeCardTemplate');
        const recipeCardHTML = recipeCardTemplate.content.cloneNode(true);

        recipeCardHTML.querySelector('article').dataset.id = recipe.id;
        recipeCardHTML.querySelector('h3').innerHTML = recipe.title;
        //recipeCardHTML.querySelector('img').src = recipe.image;

        document.querySelector(`main #${recipe.tag}`).appendChild(recipeCardHTML);
    });
}

function retrieveQueryParameters(){
    const rawParameters = splitQueryParameters();
    return createParameterObject(rawParameters);

}

function splitQueryParameters(){
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    return vars;
}

function createParameterObject(rawParameters){
    let parameterObject = {
        mealtime: [],
        amount: 0
    };

    rawParameters.forEach(param => {
        const [key, value] = param.split('=');
        if (key === 'mealtime') parameterObject.mealtime.push(value);
        else parameterObject.amount = value;
      });
    return parameterObject;
}
