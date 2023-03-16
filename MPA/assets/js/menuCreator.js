"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    replaceLoginWithUser();
    fillRecipeHtml();
}

async function fillRecipeHtml() {
    const parameters = retrieveQueryParameters();
    const recipes = await getRandomRecipes(parameters);
    createRecipeCards(recipes);
}

async function getRandomRecipes(parameters){
    const recipes = JSON.parse(sessionStorage.getItem('recipes'));
    if(checkSessionStorageRecipes(recipes, parameters) || checkSessionStorageMealtime(parameters.mealtime) ){
        sessionStorage.setItem('recipes', JSON.stringify(await APIgetRandomRecipes(parameters.amount)));
        sessionStorage.setItem('mealtime', JSON.stringify(parameters.mealtime));
    }
    return JSON.parse(sessionStorage.getItem('recipes'));
}

function checkSessionStorageRecipes(recipes, parameters){
    return recipes === null || recipes.length != (parameters.amount);
}

function checkSessionStorageMealtime(mealtimes){
    return !checkEqualObjects(JSON.parse(sessionStorage.getItem('mealtime')), mealtimes);
}

function checkEqualObjects(object1, object2){
    return JSON.stringify(object1) === JSON.stringify(object2);
}

function createRecipeCards(recipes){
    recipes.forEach(recipe => {

        const recipeCardTemplate = document.querySelector('#recipeCardTemplate');
        const recipeCardHTML = recipeCardTemplate.content.cloneNode(true);

        recipeCardHTML.querySelector('article').dataset.id = recipe.id;
        recipeCardHTML.querySelector('h3').innerHTML = recipe.title;
        recipeCardHTML.querySelector('div > span:last-of-type').addEventListener('click', () => navigateToRecipe(recipe.id));
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
