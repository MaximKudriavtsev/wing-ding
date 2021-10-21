<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) {
//        $credentials = \request(['email', 'password']);

        $request->validate([
            'email' => 'email',
            'login' => 'required|max:50',
            'password' => 'required'
        ]);

        $login = $request->get('login');
        $email = $request->get('email');

        $user = User::where('email', $email)->first();
        if ($user) {
            return response()->json([
                'status' => 'error',
                'error' => 'email already exist'
            ]);
        }
        $user = User::where('login', $login)->first();
        if ($user) {
            return response()->json([
                'status' => 'error',
                'error' => 'login already exist'
            ]);
        }

        $user = new User();
        $user->login = $login;
        $user->email = $email;
        $user->password = Hash::make($request->get('password'));
        $user->save();

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login() {
        $credentials = \request(['login', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['status' => 'error', 'error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token) {
        return response()->json([
            'access_token' => 'Bearer' . ' ' . $token
        ]);
    }
}
