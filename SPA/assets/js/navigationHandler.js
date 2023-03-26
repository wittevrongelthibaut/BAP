"use strict";

function savePreviousPage(nameOfPage, url){
    localStorage.setItem("previousPage", nameOfPage);
    const currentState = {page: nameOfPage}
    window.history.pushState(currentState, "", url);
}

function navigateBackInHistory(){
    window.history.back();
}

function replaceMain(page){
    if(page === "menuCreator"){
        initialiseMenuCreator();
    } else if (page === "profile"){
        showProfileScreen();
    } else if (page === "savedMenus"){
        initialiseSavedMenus();
    }
    else if (page === "viewSavedMenu"){
        initialiseViewMenu();
    }
}

window.addEventListener('popstate', (event) => {
  replaceMain(event.state.page);
});