"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init(){
    insertLoading('afterbegin', 'main')
    replaceLoginWithUser();
    await insertIngredients();
    removeLoading();
    removeHiddenClass(false);
}

async function insertIngredients(){
    const urlParams = new URLSearchParams(window.location.search);
    const menu = urlParams.get('menuid');
    const ingredients = await APIgetMenuIngredients(menu);
    console.log(ingredients);
    createListsFromIngredients(ingredients);
}

function createListsFromIngredients(obj) {
    for (const key in obj) {
      const mealtime = obj[key];
    
      if (mealtime.length === 0) continue;
      
      const article = document.querySelector(`#${key}`);
      const list = document.createElement("ul");
      
      createLiForUl(mealtime, list);

      article.appendChild(list);
    }
}

function createLiForUl(mealtime, list){
    for (const item of mealtime) {
        const listItem = document.createElement("li");
        listItem.innerText = item;
        list.appendChild(listItem);
      }
}

  