"use strict";

function showLoginForm(){
    clearMain();
    const loginFormTemplate = document.querySelector("#loginFormTemplate");
    const loginFormHtml = loginFormTemplate.content.cloneNode(true);

    document.querySelector("main").appendChild(loginFormHtml);
}