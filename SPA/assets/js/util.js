"use strict";

function clearMain(){
    const main = document.querySelector("main");
    main.innerHTML = "";
}

function checkLoggedIn(){
    if (localStorage.getItem("user") === null){
        return false;
    }
    return true;
}

function replaceLoginWithUser(){
    if(checkLoggedIn()){
        const user = JSON.parse(localStorage.getItem("user"));
        const loginButton = document.querySelector("header > a:last-of-type");
        loginButton.removeEventListener("click", showLoginForm);
        loginButton.innerHTML = user.name;
        loginButton.href = "#profile";
        loginButton.addEventListener("click", showProfileScreen);
    }
}