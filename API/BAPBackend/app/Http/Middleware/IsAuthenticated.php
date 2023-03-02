<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;
use App\Modules\Core\Services\ResponseService;

class IsAuthenticated
{

    private $jwtAuth;
    private $responseService;

    public function __construct(JWTAuth $jwtAuth, ResponseService $responseService)
    {
        $this->jwtAuth = $jwtAuth;
        $this->responseService = $responseService;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = $this->jwtAuth->setToken($request->bearerToken())->toUser();
        }catch(\Exception $e){
            return $this->responseService->statusBadResponse('Could not authenticate user!', $e->getMessage(), 401);
        }



        if($request->bearerToken() === null || $user === null)
        {
            return $this->responseService->statusBadResponse('Could not authenticate user!', 'No token provided', 401);
        }

        $request->merge(array("user" => $user));

        return $next($request);
    
    }
}
