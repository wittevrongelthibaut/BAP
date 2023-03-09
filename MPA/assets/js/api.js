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