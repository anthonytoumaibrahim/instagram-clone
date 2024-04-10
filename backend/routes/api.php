<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowController;
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
        Route::post('/update-settings', 'updateProfileSettings');
        Route::get('/get-settings', 'getProfileSettings');
    });

    Route::controller(PostController::class)->group(function () {
        Route::get('/get-posts', 'getAllPosts');
        Route::post('/create-post', 'create');
        Route::post('/like-post', 'likePost');
        Route::get('/comments', 'getComments');
        Route::post('/comment', 'comment');
    });

    Route::controller(FollowController::class)->group(function () {
        Route::get('/feed', 'getFeed');
        Route::get('/recommended', 'getRecommendedUsers');
        Route::get('/followers/{id?}/{type?}', 'getFollowers');
        Route::post('/follow', 'follow');
    });
});
