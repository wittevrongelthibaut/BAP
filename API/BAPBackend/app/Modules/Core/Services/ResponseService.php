<?php

namespace App\Modules\Core\Services;

class ResponseService{

    public function statusOkResponse($message){
        return response([
            'status' => 200,
            'message' => $message]);
    }

    public function statusBadResponse($message, $errors, $statusCode = 400){
        return response([
            'status' => $statusCode,
            'message' => $message,
            'errors' =>$errors
        ],$statusCode);
    }

}