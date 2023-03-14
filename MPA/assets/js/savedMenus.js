"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    replaceLoginWithUser();
    await fillSavedMenus();
}

async function fillSavedMenus() {
    const savedMenus = await APIgetSavedMenus();
    createSavedMenus(savedMenus);
}

function createSavedMenus(savedMenus){
    savedMenus.forEach(menu => {
        const savedMenuTemplate = document.querySelector('#savedMenuTemplate');
        const savedMenuHTML = savedMenuTemplate.content.cloneNode(true);

        savedMenuHTML.querySelector('article').dataset.id = menu.id;
        savedMenuHTML.querySelector('h3').innerHTML = menu.name;
        savedMenuHTML.querySelector('p').innerHTML = menu.created_at;

        document.querySelector(`main`).appendChild(savedMenuHTML);
    });
}
