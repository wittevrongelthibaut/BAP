"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    document.querySelector('input[type="submit"]').addEventListener('click', generateMenu);
}

async function generateMenu(e){
    e.preventDefault();
    const formdata = new FormData(document.querySelector('form'));
    const urlParams = new URLSearchParams(formdata);
    window.location.href = `menuCreator.html?${urlParams}`;
}

