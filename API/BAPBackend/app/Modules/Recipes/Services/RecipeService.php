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

    public function retrieveRandomRecipes($limit = 5)
    {
        return $this->model->inRandomOrder()->limit($limit)->get();
    }

}