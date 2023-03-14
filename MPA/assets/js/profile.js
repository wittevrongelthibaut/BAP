'use strict';

document.addEventListener("DOMContentLoaded", init);

function init() {
    replaceLoginWithUser();
    document.querySelector('main > a:last-of-type').addEventListener('click', logout);
}

function logout(e){
    e.preventDefault();
    console.log('eerste')
    const href = e.target.href;
    APIlogout(href);
}

