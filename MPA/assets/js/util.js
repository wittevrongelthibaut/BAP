'use strict';

function checkLoggedIn(){
    if (localStorage.getItem("user") === null){
        return false;
    }
    return true;
}

function replaceLoginWithUser(){
    if(checkLoggedIn()){
        const user = JSON.parse(localStorage.getItem("user"));
        document.querySelector("header > a:last-of-type").innerHTML = user.name;
        document.querySelector("header > a:last-of-type").href = "profile.html";
    }
}

function navigateToRecipe(id){
    window.location.href = `recipe.html?id=${id}`;
}

function toggleOverlay(){
    document.querySelector('#overlay').classList.toggle('hidden');
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
    const recipeCardTemplate = document.querySelector('#recipeCardTemplate');
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

function navigateBackInHistory(){
    window.history.back();
}

async function refreshRecipe(e,id, tag){
    const allRecipes = JSON.parse(sessionStorage.getItem('recipes'));
    const recipe = allRecipes[tag].find(recipe => recipe.id === id);
    const index = allRecipes[tag].indexOf(recipe);
    const parameterObject = {
        mealtime: [tag],
        amount: 1
    }
    const newRecipe = await APIgetRandomRecipes(parameterObject);
    allRecipes[tag][index] = newRecipe[tag][0];
    sessionStorage.setItem('recipes', JSON.stringify(allRecipes));
    const article = e.target.parentElement.parentElement;
    article.remove();
    createRecipeArticle(newRecipe[tag][0], true);
}
