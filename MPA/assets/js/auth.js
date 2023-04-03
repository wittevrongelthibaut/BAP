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
            if(isLoginRedirect()){
                checkLoginRedirect();
            }
            else
            {
            window.location.href = "index.html";
            }
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
            if(isLoginRedirect()){
                checkLoginRedirect();
            }
            else
            {
            window.location.href = "index.html";
            }
        } else {
            console.log(data);
        }
    });
}

function saveLoginResponse(data){
    localStorage.setItem('token', data.authorisation.token);
    localStorage.setItem('user', JSON.stringify(data.user));
}

async function saveMenuRedirect(){

    sessionStorage.removeItem('loginRedirect');
    const menu = JSON.parse(sessionStorage.getItem('menuToSave'));

    sessionStorage.removeItem('menuToSave');
    const data = await APIsaveMenu(menu);

    if(data.status === 200){
        sessionStorage.removeItem('menuToSave');
        window.location.href = 'savedMenus.html';
    }
}

function isLoginRedirect(){
    return sessionStorage.getItem('loginRedirect') ? true : false;
}

function checkLoginRedirect(){
    const message = sessionStorage.getItem('loginRedirect');
    if(message === 'could not save menu'){
        saveMenuRedirect();
    }
}