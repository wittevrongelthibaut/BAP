"use strict";

async function initialiseRecipe(){
    replaceLoginWithUser();
    await fillRecipeHtml();
    document.querySelector("#backwards").addEventListener("click", navigateBackInHistory);
}

async function fillRecipeHtml() {
    insertRecipeTemplate();
    const id = retrieveQueryParameterId();
    const recipe = await APIgetRecipeById(id);
    changeRecipeTitleHeader(recipe.title);
    //changeRecipeImage(recipe.image);
    fillIngredientsList(recipe.ingredients);
    fillInstructionsList(recipe.instructions);
}

function insertRecipeTemplate(){
    const recipeTemplate = document.querySelector("#recipeTemplate");
    const recipeHtml = recipeTemplate.content.cloneNode(true);
    document.querySelector("main").appendChild(recipeHtml);
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