"use strict";

let recipes;

document.addEventListener("DOMContentLoaded", init);

async function init(){
    document.querySelector("#backwards").addEventListener("click", navigateBackInHistory);
    insertLoading('beforeend', 'main')
    replaceLoginWithUser();
    await setRecipes();
    createRecipeCards(recipes);
    removeLoading();
    removeHiddenClass(true);
}

async function setRecipes(){
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('id');
    recipes = await APIgetMenuRecipes(menu);
    document.querySelector("button").addEventListener("click", () => navToIngredients(menu));
}

function navToIngredients(menuId){
    window.location.href = `ingredients.html?menuid=${menuId}`;
}