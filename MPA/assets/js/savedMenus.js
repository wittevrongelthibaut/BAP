"use strict";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    insertLoading('beforeend', 'main');
    replaceLoginWithUser();
    await fillSavedMenus();
    removeLoading();
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
        savedMenuHTML.querySelector('span').addEventListener('click', () => navigateToMenu(menu.id));

        document.querySelector(`main`).appendChild(savedMenuHTML);
    });
}

function navigateToMenu(id) {
    window.location.href = `menu.html?id=${id}`;
}