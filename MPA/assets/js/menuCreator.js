"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    insertLoading('afterbegin', 'main')
    replaceLoginWithUser();
    await fillRecipeHtml();
    document.querySelector('button').addEventListener('click', openConfirmation);
    removeLoading();
    removeHiddenClass(true);
}

async function fillRecipeHtml() {
    const parameters = retrieveQueryParameters();
    const recipes = await getRandomRecipes(parameters);
    createRecipeCardsMenuCreator(recipes);
}

async function getRandomRecipes(parameters){
    const recipes = JSON.parse(sessionStorage.getItem('recipes'));
    if(checkSessionStorageRecipes(recipes, parameters) || checkSessionStorageMealtime(parameters.mealtime) ){
        sessionStorage.setItem('recipes', JSON.stringify(await APIgetRandomRecipes(parameters)));
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

async function saveMenu(e){
    e.preventDefault();
    const menu = createMenuObject();
    const data = await APIsaveMenu(menu);
    if(data.status === 200){
    window.location.href = 'savedMenus.html';
    }
}

function createMenuObject(){
    const recipe = sessionStorage.getItem('recipes');
    const recipeIdList = JSON.parse(recipe).map(recipe => recipe.id);
    const menuName = document.querySelector('#final-confirmation input[type="text"]').value;
    return { name: menuName, recipes: recipeIdList};
}

function openConfirmation(){
    toggleOverlay();
    const confirmationTemplate = document.querySelector('#confirmation-div');
    const confirmationHTML = confirmationTemplate.content.cloneNode(true);
    confirmationHTML.querySelector('input[type="submit"]').addEventListener('click', saveMenu);
    confirmationHTML.querySelector('button').addEventListener('click', closeConfirmation);
    document.querySelector('body').appendChild(confirmationHTML);
}

function closeConfirmation(e){
    e.preventDefault();
    const confirmationDiv = document.querySelector('#final-confirmation');
    confirmationDiv.remove();
    toggleOverlay();
}

