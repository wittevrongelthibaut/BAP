<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modules\Menus\Services\MenuService;
use App\Modules\Core\Services\ResponseService;

class MenuController extends Controller
{
    private $menuService;
    private $responseService;

    public function __construct(MenuService $menuService, ResponseService $responseService)
    {
        $this->menuService = $menuService;
        $this->responseService = $responseService;
    }

    public function all(Request $request){
        $userId = $request->user->id;
        return $this->menuService->all($userId);
    }

    public function create(Request $request){
        $data = $request->all();
        $this->menuService->create($data);

        if($this->menuService->hasErrors()){
            return $this->responseService->statusBadResponse('Could not create menu', $this->menuService->getErrors());
        }

        return $this->responseService->statusOkResponse('Menu created');
    }
}
