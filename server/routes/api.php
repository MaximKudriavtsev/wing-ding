<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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
    Route::post('/profile/get')->middleware('auth');
    Route::post('/profile/change')->middleware('auth');
    Route::post('/friends/get')->middleware('auth');
    Route::post('/friends/add')->middleware('auth');
});

Route::prefix('/event')->group(function () {
    Route::post('/create')->middleware('auth');
    Route::post('/join')->middleware('auth');
    Route::post('/leave')->middleware('auth');
    Route::post('/get')->middleware('auth');
    Route::post('/list/get')->middleware('auth');
});
