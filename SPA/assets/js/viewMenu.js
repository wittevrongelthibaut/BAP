"use strict";

let recipesInMenu;

async function initialiseViewMenu(){
    clearMain();
    insertMenuTemplate();
    document.querySelector("#backwards").addEventListener("click", navigateBackInHistory);
    insertLoading('beforeend', 'main')
    replaceLoginWithUser();
    await setRecipes();
    createRecipeCards(recipesInMenu);
    removeLoading();
    removeHiddenClass(true);
}

async function setRecipes(){
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('id');
    recipesInMenu = await APIgetMenuRecipes(menu);
    document.querySelector("button").addEventListener("click", () => navToIngredients(menu));
}

function navToIngredients(menuId){
    window.history.pushState({}, "", `index.html?menuid=${menuId}`);
    initialiseIngredients();
}

function insertMenuTemplate(){
    const menuTemplate = document.querySelector("#menuTemplate");
    const menuHtml = menuTemplate.content.cloneNode(true);
    document.querySelector("main").appendChild(menuHtml);
}