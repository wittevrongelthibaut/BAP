<?php

namespace App\Modules\Recipes\Services;

use App\Modules\Core\Services\Service;
use App\Models\Recipe;

class RecipeService extends Service{

    public function __construct(Recipe $model)
    {
        parent::__construct($model);
    }

    public function all()
    {
        return $this->model->all();
    }

    public function retrieveRecipeById($id)
    {
        return $this->model->where('id', $id)->first();
    }

    public function retrieveRandomRecipes($queryParams)
    {
        $recipes = [];
        foreach($queryParams['mealtime'] as $mealtime){
            $recipes[$mealtime] = $this->model->where('tag', $mealtime)->inRandomOrder()->limit($queryParams['amount'])->get();
        }
        return $recipes;
    }

    public function retrieveRecipesInMenu($menuId)
    {
        return $this->model->whereHas('menus', function($query) use ($menuId){
            $query->where('menu_id', $menuId);
        })->get();
    }

    public function retrieveIngredientsInRecipes($menuId){
        $recipes = $this->retrieveRecipesInMenu($menuId);
        $ingredients = ['breakfast' => [], 'lunch' => [], 'dinner' => []];
        foreach($recipes as $recipe){
            foreach($recipe->ingredients as $ingredient){
                if($recipe->tag === 'breakfast'){
                    $ingredients['breakfast'][] = $ingredient;
                } elseif($recipe->tag === 'lunch'){
                    $ingredients['lunch'][] = $ingredient;
                } elseif($recipe->tag === 'dinner'){
                    $ingredients['dinner'][] = $ingredient;
                }
            }
        }
        return $ingredients;
    }
    
}