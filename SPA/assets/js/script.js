"use strict";

document.addEventListener("DOMContentLoaded", init);


function init(){
    document.querySelector("header > a:last-of-type").addEventListener("click", showLoginForm);
}

function showLoginForm(e){
    e.preventDefault();
    console.log('hi');
    const loginFormTemplate = document.querySelector("#loginFormTemplate");
    const loginFormHtml = loginFormTemplate.content.cloneNode(true);

    document.querySelector("main").appendChild(loginFormHtml);
}