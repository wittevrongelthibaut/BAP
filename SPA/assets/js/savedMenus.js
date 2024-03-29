"use strict";

async function initialiseSavedMenus(){
    clearMain();
    const savedMenuScreenTemplate = document.querySelector("#savedMenuScreenTemplate");
    const savedMenuScreenHtml = savedMenuScreenTemplate.content.cloneNode(true);
    document.querySelector("main").appendChild(savedMenuScreenHtml);
    replaceLoginWithUser();
    document.querySelector("#backwards").addEventListener("click", navigateBackInHistory);
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
    savePreviousPage('viewSavedMenu',`index.html?id=${id}`);
    initialiseViewMenu();
}