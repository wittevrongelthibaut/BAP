"use strict";

async function initialiseMenuCreator(){
    insertLoading('afterbegin', 'main');
    replaceLoginWithUser();
    await fillMenuRecipeHtml();
    removeLoading();
    removeHiddenClass(true);
}

async function fillMenuRecipeHtml() {
    const parameters = retrieveQueryParameters();
    const recipes = await getRandomRecipes(parameters);
    insertMenuCreatorHtml();
    createRecipeCardsMenuCreator(recipes);
}

function insertMenuCreatorHtml(){
    const menuCreatorTemplate = document.querySelector('#menuCreatorTemplate');
    const menuCreatorHTML = menuCreatorTemplate.content.cloneNode(true);
    document.querySelector('main').appendChild(menuCreatorHTML);
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
    if(recipes === null) return false;
    const recipesArray = Object.values(recipes).flat();

    return recipes === null || recipesArray.length != (parameters.amount * parameters.mealtime.length);
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
