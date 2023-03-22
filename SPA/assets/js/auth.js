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
            showProfileScreen();
            window.history.pushState({}, "", `#profile`);
        } else {
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

async function logout(e){
    e.preventDefault();
    await APIlogout();
    window.location.href = "index.html";
}