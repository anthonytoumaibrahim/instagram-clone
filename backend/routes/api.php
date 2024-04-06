<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->middleware(['api', 'auth:api'])->controller(AuthController::class)->group(function () {
    Route::withoutMiddleware('auth:api')->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
    });
    Route::get('/logout', 'logout');
    Route::get('/refresh', 'refresh');
});
