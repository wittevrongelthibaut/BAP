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