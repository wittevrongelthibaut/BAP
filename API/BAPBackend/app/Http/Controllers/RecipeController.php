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

    public function retrieveRandomRecipes(Request $request){
        return $this->recipeService->retrieveRandomRecipes($request->query());
    }

    public function retrieveRecipesInMenu($menuId){
        return $this->recipeService->retrieveRecipesInMenu($menuId);
    }

    public function retrieveIngredientsInRecipes($menuId){
        return $this->recipeService->retrieveIngredientsInRecipes($menuId);
    }
}
