<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modules\Recipes\Services\RecipeService;

class RecipeController extends Controller
{
    private $recipeService;

    public function __construct(RecipeService $recipeService)
    {
        $this->middleware('auth:api');
        $this->recipeService = $recipeService;
    }

    public function all(){
        return $this->recipeService->all();
    }
}
