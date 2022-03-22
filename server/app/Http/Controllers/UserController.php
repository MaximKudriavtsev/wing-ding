<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getProfile() {
        try {
            $user = auth()->user();

            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
        } catch (\Throwable $ex) {
            return \response()->json([
                'status' => 'error',
                'error' => $ex->getMessage(),
            ]);
        }
    }

    public function get($id) {

        try {
            $user = User::find($id);

            if ($user) {
                return response()->json([
                    'status' => 'success',
                    'user' => $user
                ]);
            } else {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'no such user',
                ]);
        }

        } catch (\Throwable $ex) {
            return \response()->json([
                'status' => 'error',
                'error' => $ex->getMessage(),
            ]);
        }
    }

    public function selfEvents() {
        $user = auth()->user();

        $events = $user->events()->get();

        $data = [];

        foreach ($events as $key => $event) {
            $data[$key] = $event;
            $data[$key]['members_photo'] = $event->users()->take(3)->pluck('photo');
        }

        return $data;
    }
}
