<?php

namespace App\Modules\Menus\Services;

use App\Modules\Core\Services\Service;
use App\Models\Menu;

class MenuService extends Service{

    public function __construct(Menu $model)
    {
        parent::__construct($model);
    }

    public function all($userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }
}