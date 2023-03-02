<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
});

Route::controller(RecipeController::class)->group(function () {
    Route::get('/recipes', 'all');
    Route::get('/recipes/{id}', 'retrieveRecipeById');
    Route::get('/recipes/random/{limit?}', 'retrieveRandomRecipes');
});
