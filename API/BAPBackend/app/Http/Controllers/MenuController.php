<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modules\Menus\Services\MenuService;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class MenuController extends Controller
{
    private $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    public function all(Request $request){
        $userId = $request->user->id;
        return $this->menuService->all($userId);
    }
}
