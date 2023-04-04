"use strict";

function showLoginForm(){
    clearMain();
    const loginFormTemplate = document.querySelector("#loginFormTemplate");
    const loginFormHtml = loginFormTemplate.content.cloneNode(true);
    loginFormHtml.querySelector("a").addEventListener("click", showRegisterForm);
    loginFormHtml.querySelector('input[type="submit"]').addEventListener('click', login);

    document.querySelector("main").appendChild(loginFormHtml);
}

function showRegisterForm(){
    clearMain();
    const registerFormTemplate = document.querySelector("#registerFormTemplate");
    const registerFormHtml = registerFormTemplate.content.cloneNode(true);
    registerFormHtml.querySelector('input[type="submit"]').addEventListener('click', register);

    document.querySelector("main").appendChild(registerFormHtml);
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
                showProfileScreen();
                window.history.pushState({}, "", `#profile`);
            }
        }
        else {
            console.log(data);
        }
    });
}

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

async function logout(e){
    e.preventDefault();
    await APIlogout();
    window.location.href = "index.html";
}

async function saveMenuRedirect(){

    sessionStorage.removeItem('loginRedirect');
    const menu = JSON.parse(sessionStorage.getItem('menuToSave'));

    sessionStorage.removeItem('menuToSave');
    const data = await APIsaveMenu(menu);

    if(data.status === 200){
        sessionStorage.removeItem('menuToSave');
        showProfileScreen();
        window.history.pushState({}, "", `#profile`);
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