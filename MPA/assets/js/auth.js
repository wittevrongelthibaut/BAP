"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
   setClickEvents();
}

function setClickEvents(){
    if(window.location.pathname == "/login.html"){
        document.querySelector('input[type="submit"]').addEventListener('click', login);
    } 
    else
    {
        document.querySelector('input[type="submit"]').addEventListener('click', register);
    }
}

function login(e){
    e.preventDefault();
    let formdata = new FormData(document.querySelector('form'));
    APIauthentication(formdata, "/login")
    .then(data => {
        if(data.status == "success"){
            saveLoginResponse(data);
            window.location.href = "index.html";
        } else {
            console.log(data);
        }
    });
}
//TODO see if login and register can be combined into one function
function register(e){
    e.preventDefault();
    let formdata = new FormData(document.querySelector('form'));
    APIauthentication(formdata, "/register")
    .then(data => {
        if(data.status == "success"){
            saveLoginResponse(data);
            window.location.href = "index.html";
        } else {
            console.log(data);
        }
    });
}

function saveLoginResponse(data){
    localStorage.setItem('token', data.authorisation.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}
