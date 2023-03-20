"use strict";

const API_URL = "http://bapbackend.local/api";

async function APIauthentication (formdata, slug){
    return fetch(API_URL + slug, {
        method: "POST",
        body: formdata
    })
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIgetRandomRecipes(parameters){
    const url = createRandomRecipesUrl(parameters);
    return fetch(`${API_URL}/recipes/random/params?${url}`)
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIlogout(href){
    fetch(API_URL + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    localStorage.clear();
}

async function APIgetSavedMenus(){
    return fetch(API_URL + "/menus", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIgetRecipeById(id){
    return fetch(API_URL + "/recipes/" + id)
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIsaveMenu(body){
    return fetch(API_URL + "/menus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIgetMenuRecipes(id){
    return fetch(API_URL + "/recipes/in-menu/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIgetMenuIngredients(id){
    return fetch(API_URL + `/recipes/in-menu/${id}/ingredients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => response.json())
    .then(data => { return data; });
}

function createRandomRecipesUrl(parameters){
    let url = "";
    parameters.mealtime.forEach(mealtime => {
        url += `&mealtime[]=${mealtime}`;
    });
    url += `&amount=${parameters.amount}`;
    return url;
}