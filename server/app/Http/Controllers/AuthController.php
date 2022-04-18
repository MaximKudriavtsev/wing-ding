<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request) {

        try {
            $request->validate([
                'email' => 'email',
            ]);
        } catch (\Throwable $exception) {
            return response()->json([
                'status' => 'error',
                'error' => 'email not valid'
            ]);
        }

        $email = $request->get('email');
        $first_name = $request->get('first_name');
        $last_name = $request->get('last_name');

        $user = User::where('email', $email)->first();
        if ($user) {
            return response()->json([
                'status' => 'error',
                'error' => 'email already exist'
            ]);
        }

        $user = new User();
        $user->email = $email;
        $user->password = Hash::make($request->get('password'));
        $user->first_name = $first_name;
        $user->last_name = $last_name;
        $user->save();

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login() {
        $credentials = \request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['status' => 'error', 'error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token) {
        return response()->json([
            'status' => 'ok',
            'access_token' => 'Bearer' . ' ' . $token
        ]);
    }
}
