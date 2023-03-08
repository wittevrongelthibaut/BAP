"use strict";

const API_URL = "http://bapbackend.local/api";

async function APIlogin(formdata){
    return await fetch(API_URL + "/login", {
        method: "POST",
        body: formdata
    })
    .then(response => response.json())
    .then(data => { return data; });
};