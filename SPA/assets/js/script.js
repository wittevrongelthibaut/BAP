"use strict";

document.addEventListener("DOMContentLoaded", init);


function init(){
    replaceLoginWithUser();
    document.querySelector("header > a:last-of-type").addEventListener("click", showLoginForm, true);
    document.querySelector('#mealGen input[type="submit"]').addEventListener("click", generateMenu);
}

function generateMenu(e){
    e.preventDefault();
    const formdata = new FormData(document.querySelector('form'));
    const urlParams = new URLSearchParams(formdata);
    savePreviousPage('menuCreator', `?${urlParams}`);
    initialiseMenuCreator();
}

function showProfileScreen(){
    savePreviousPage('profile', '#profile');
    clearMain();
    replaceLoginWithUser();
    const profileTemplate = document.querySelector("#profileTemplate");
    const profileHtml = profileTemplate.content.cloneNode(true);
    profileHtml.querySelector("a:last-of-type").addEventListener("click", logout);
    profileHtml.querySelector("a:first-of-type").addEventListener("click", showSavedMenusScreen);
    document.querySelector("main").appendChild(profileHtml);
}

function showSavedMenusScreen(){
    savePreviousPage('savedMenus', '#savedMenus');
    initialiseSavedMenus();
}