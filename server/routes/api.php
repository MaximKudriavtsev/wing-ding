<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/user')->group(function () {
    Route::post('/auth', [AuthController::class, 'login']);
    Route::post('/registration', [AuthController::class, 'register']);
    Route::post('/profile/get', [UserController::class, 'getProfile'])->middleware('auth');
    Route::post('/get/{id}', [UserController::class, 'get'])->middleware('auth');
    Route::post('/profile/change')->middleware('auth');
    Route::post('/friends/get', [UserController::class, 'getFriends'])->middleware('auth');
    Route::post('/friends/add/{id}', [UserController::class, 'addFriend'])->middleware('auth');
    Route::post('/friends/delete/{id}', [UserController::class, 'deleteFriend'])->middleware('auth');
    Route::post('/get/{id}/friends', [UserController::class, 'getAnotherUserFriends'])->middleware('auth');
    Route::post('/get/{id}/events', [UserController::class, 'getAnotherUserEvents'])->middleware('auth');
    Route::post('/events', [UserController::class, 'selfEvents'])->middleware('auth');
});

Route::prefix('/event')->group(function () {
    Route::post('/create', [EventController::class, 'create'])->middleware('auth');
    Route::post('/join/{id}', [EventController::class, 'join'])->middleware('auth');
    Route::post('/leave/{id}', [EventController::class, 'leave'])->middleware('auth');
    Route::post('/get/{id}', [EventController::class, 'get'])->middleware('auth');
    Route::post('/list/get')->middleware('auth');
    Route::post('/get/{id}/users', [EventController::class, 'getUsers'])->middleware('auth');
});
