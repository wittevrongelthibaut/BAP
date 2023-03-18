"use strict";

let recipes;

document.addEventListener("DOMContentLoaded", init);

async function init(){
    insertLoading('afterbegin', 'main')
    replaceLoginWithUser();
    await setRecipes();
    createRecipeCards(recipes);
    removeLoading();
    removeHiddenClass();
}

async function setRecipes(){
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('id');
    recipes = await APIgetMenuRecipes(menu);
}