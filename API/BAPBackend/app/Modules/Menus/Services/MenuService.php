<?php

namespace App\Modules\Menus\Services;

use App\Modules\Core\Services\Service;
use App\Models\Menu;

class MenuService extends Service{

    protected $rules = [
        'user_id' => 'required|integer|exists:App\Models\User,id',
        'title' => 'required|string',
        'recipes' => 'required|array',
        'recipes.*' => 'required|integer|exists:App\Models\Recipe,id'
    ];

    public function __construct(Menu $model)
    {
        parent::__construct($model);
    }

    public function all($userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function create($data){

        $data['user_id'] = $data['user']->id;
        unset($data['user']);

        $this->validate($data);
        if($this->hasErrors()){
            return;
        }
        
        dd($data);
    }
}