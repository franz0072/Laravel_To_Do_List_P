<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller {
    public function listUsers() {
        return User::with('tasks')->get();
    }

    public function deleteUser($id) {
        $user = User::findOrFail($id);
        $user->tasks()->delete(); // optional
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
