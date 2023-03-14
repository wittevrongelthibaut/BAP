"use strict";

const API_URL = "http://bapbackend.local/api";

async function APIauthentication (formdata, slug){
    return await fetch(API_URL + slug, {
        method: "POST",
        body: formdata
    })
    .then(response => response.json())
    .then(data => { return data; });
}

async function APIgetRandomRecipes(amount){
    return await fetch(`${API_URL}/recipes/random/${amount}`)
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
    window.location.href = href;
}