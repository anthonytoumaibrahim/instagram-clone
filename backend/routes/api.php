<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
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

Route::middleware(['api', 'auth:api'])->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('/profile/{username?}', 'getProfile');
        Route::post('/upload-pfp', 'uploadAvatar');
    });

    Route::controller(PostController::class)->group(function () {
        Route::post('/create-post', 'create');
    });
});
