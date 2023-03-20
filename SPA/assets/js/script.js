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
    window.history.pushState({}, "", `?${urlParams}`);
    clearMain();
}

function showProfileScreen(){
    clearMain();
    const profileTemplate = document.querySelector("#profileTemplate");
    const profileHtml = profileTemplate.content.cloneNode(true);
    document.querySelector("main").appendChild(profileHtml);
}