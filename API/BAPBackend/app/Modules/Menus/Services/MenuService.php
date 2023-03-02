<?php

namespace App\Modules\Menus\Services;

use App\Modules\Core\Services\Service;
use App\Models\Menu;
use Error;
use Illuminate\Support\Facades\DB;

class MenuService extends Service{

    protected $rules = [
        'user_id' => 'required|integer|exists:App\Models\User,id',
        'name' => 'required|string',
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
        DB::beginTransaction();
        try{
            $menu = $this->model->create($data);
            $menu->recipes()->attach($data['recipes']);
            DB::commit();
            return $menu;
        }catch(Error $e){
            DB::rollback();
            $this->addError($e->getMessage());
        }
    }
}