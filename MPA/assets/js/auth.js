"use strict"

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('input[type="submit"]').addEventListener('click', login);
}

function login(e){
    e.preventDefault();
    let formdata = new FormData(document.querySelector('form'));
    APIlogin(formdata)
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
