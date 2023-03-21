"use strict";

function clearMain(){
    const main = document.querySelector("main");
    main.innerHTML = "";
}

function checkLoggedIn(){
    if (localStorage.getItem("user") === null){
        return false;
    }
    return true;
}

function replaceLoginWithUser(){
    if(checkLoggedIn()){
        const user = JSON.parse(localStorage.getItem("user"));
        const loginButton = document.querySelector("header > a:last-of-type");
        loginButton.removeEventListener("click", showLoginForm);
        loginButton.innerHTML = user.name;
        loginButton.href = "#profile";
        loginButton.addEventListener("click", showProfileScreen);
    }
}

function insertLoading(place, selectorString){
    document.querySelector(`${selectorString}`).insertAdjacentHTML(`${place}`, '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
}

function removeLoading(){
    document.querySelector('.lds-ring').remove();
}

function showArticles() {
    const articles = document.querySelectorAll('article');
    articles.forEach((article) => {
      const elements = article.querySelectorAll('*');
      if (elements.length > 1) {
        article.classList.remove('hidden');
      }
    });
  }

function removeHiddenClass(containsHiddenButton){
    showArticles();
    if(containsHiddenButton){
        document.querySelector('button').classList.remove('hidden');
    }
}

function createRecipeCards(recipes){
    recipes.forEach(recipe => {
        createRecipeArticle(recipe, false);
    });
}

function createRecipeCardsMenuCreator(recipes){
    for (const mealtime in recipes) {
        recipes[mealtime].forEach(recipe => {
            createRecipeArticle(recipe, true);
        });
    }
}

function createRecipeArticle(recipe, containsRefreshButton){
    let recipeCardTemplate = document.querySelector('#recipeCardTemplate');
    if(containsRefreshButton){ 
        recipeCardTemplate = document.querySelector('#recipeCreatorCardTemplate');
    }
    const recipeCardHTML = recipeCardTemplate.content.cloneNode(true);
    
    recipeCardHTML.querySelector('article').dataset.id = recipe.id;
    recipeCardHTML.querySelector('h3').innerHTML = recipe.title;
    recipeCardHTML.querySelector('div > span:last-of-type').addEventListener('click', () => navigateToRecipe(recipe.id));
    //recipeCardHTML.querySelector('img').src = recipe.image;
    if(containsRefreshButton){
        recipeCardHTML.querySelector('div > span').addEventListener('click', (e) => refreshRecipe(e,recipe.id, recipe.tag));
    }
    document.querySelector(`main #${recipe.tag}`).appendChild(recipeCardHTML);
}

function navigateToRecipe(id){
    clearMain();
    window.history.pushState({}, "", `index.html?id=${id}`);
    initialiseRecipe();
}

function navigateBackInHistory(){
    window.history.back();
}

function toggleOverlay(){
    document.querySelector('#overlay').classList.toggle('hidden');
}