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
    document.querySelector('button').addEventListener('click', openConfirmation);
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

async function saveMenu(e){
    e.preventDefault();
    const menu = createMenuObject();
    const data = await APIsaveMenu(menu);
    if(data.status === 200){
        showProfileScreen();
        closeConfirmation(e);
    }
}

function createMenuObject(){
    const recipesList = JSON.parse(sessionStorage.getItem('recipes'));
    const recipesArray = Object.values(recipesList).flat();
    const recipeIdList = recipesArray.map(recipe => recipe.id);
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