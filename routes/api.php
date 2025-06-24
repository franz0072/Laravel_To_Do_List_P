<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdminController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('tasks', TaskController::class);
      Route::get('/admin/users', [AdminController::class, 'listUsers']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
});

