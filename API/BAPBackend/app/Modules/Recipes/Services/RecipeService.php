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

    public function retrieveRandomRecipes($limit)
    {
        return $this->model->inRandomOrder()->limit($limit)->get();
    }

    public function retrieveRecipesInMenu($menuId)
    {
        return $this->model->whereHas('menus', function($query) use ($menuId){
            $query->where('menu_id', $menuId);
        })->get();
    }
}