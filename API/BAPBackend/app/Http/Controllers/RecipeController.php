<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modules\Recipes\Services\RecipeService;

class RecipeController extends Controller
{
    private $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->recipeService = $recipeService;
    }

    public function all(){
        return $this->recipeService->all();
    }

    public function retrieveRecipeById($id){
        return $this->recipeService->retrieveRecipeById($id);
    }

    public function retrieveRandomRecipes($limit = 5){
        return $this->recipeService->retrieveRandomRecipes($limit);
    }

    public function retrieveRecipesInMenu($menuId){
        return $this->recipeService->retrieveRecipesInMenu($menuId);
    }
}
