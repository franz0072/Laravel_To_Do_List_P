<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
             'is_admin' => true, // 👈 TEMP: makes everyone admin (only for testing)
        ]);

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user,  // <-- Add this line
        ]);
    }


    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'token' => $user->createToken('token')->plainTextToken,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin, // ✅ Important
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
