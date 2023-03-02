<?php

namespace App\Modules\Recipes\Services;

use App\Modules\Core\Services\Service;
use App\Models\Recipe;

class RecipeService extends Service{

    public function __construct(Recipe $model)
    {
        parent::__construct($model);
    }
    
}