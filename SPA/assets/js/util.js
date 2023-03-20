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
        document.querySelector("header > a:last-of-type").innerHTML = user.name;
        document.querySelector("header > a:last-of-type").href = "profile.html";
    }
}