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

        const recipeCardTemplate = document.querySelector('#recipeCardTemplate');
        const recipeCardHTML = recipeCardTemplate.content.cloneNode(true);

        recipeCardHTML.querySelector('article').dataset.id = recipe.id;
        recipeCardHTML.querySelector('h3').innerHTML = recipe.title;
        recipeCardHTML.querySelector('div > span:last-of-type').addEventListener('click', () => navigateToRecipe(recipe.id));
        //recipeCardHTML.querySelector('img').src = recipe.image;

        document.querySelector(`main #${recipe.tag}`).appendChild(recipeCardHTML);
    });
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
