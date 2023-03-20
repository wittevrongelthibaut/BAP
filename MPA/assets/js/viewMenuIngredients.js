"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init(){
    document.querySelector("#backwards").addEventListener("click", navigateBackInHistory);
    insertLoading('beforeend', 'main')
    replaceLoginWithUser();
    await insertIngredients();
    document.querySelector("button").addEventListener("click", () => downloadIngredients());
    removeLoading();
    removeHiddenClass(true);
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

function downloadIngredients(){
    const main = document.querySelector("main");
    const textContent = main.innerText;

    const blob = new Blob([textContent], { type: 'text/plain' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ingredients.txt';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

  