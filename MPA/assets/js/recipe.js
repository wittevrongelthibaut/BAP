"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    replaceLoginWithUser();
    fillRecipeHtml();
}

async function fillRecipeHtml() {
    const id = retrieveQueryParameterId();
    const recipe = await APIgetRecipeById(id);
    console.log(recipe);
    changeRecipeTitleHeader(recipe.title);
    //changeRecipeImage(recipe.image);
    fillIngredientsList(recipe.ingredients);
    fillInstructionsList(recipe.instructions);
}

function changeRecipeTitleHeader(recipeTitle){
    document.querySelector("h2").innerHTML = recipeTitle;
}

function changeRecipeImage(recipeImage){
    document.querySelector("img").src = recipeImage;
}

function fillIngredientsList(ingredients){
    const ingredientsList = document.querySelector("ul");
    for (const [key, value] of Object.entries(ingredients)) {
        const ingredient = document.createElement("li");
        ingredient.innerHTML = `${value}`;
        ingredientsList.appendChild(ingredient);
      }
}

function fillInstructionsList(instructions){
    const instructionsList = document.querySelector("ol");
    for (const [key, value] of Object.entries(instructions)) {
        const instruction = document.createElement("li");
        instruction.innerHTML = `${value}`;
        instructionsList.appendChild(instruction);
      }
}



function retrieveQueryParameterId(){
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    const id = vars[0].split("=")[1];
    return id;
}