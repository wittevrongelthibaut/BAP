"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('input[type="submit"]').addEventListener('click', generateMenu);
}

async function generateMenu(e){
    e.preventDefault();
    const amount = document.querySelector('input[type="number"]').value;
    const recipes = await APIgetRandomRecipes(amount);
    console.log(recipes);
}

