"use strict";

function showLoginForm(){
    clearMain();
    const loginFormTemplate = document.querySelector("#loginFormTemplate");
    const loginFormHtml = loginFormTemplate.content.cloneNode(true);
    loginFormHtml.querySelector("a").addEventListener("click", showRegisterForm);

    document.querySelector("main").appendChild(loginFormHtml);
}

function showRegisterForm(){
    clearMain();
    const registerFormTemplate = document.querySelector("#registerFormTemplate");
    const registerFormHtml = registerFormTemplate.content.cloneNode(true);

    document.querySelector("main").appendChild(registerFormHtml);
}