<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getProfile() {
        $user = auth()->user();

        return response()->json($user);
    }

    public function selfEvents() {
        $user = auth()->user();

        $events = $user->events()->get();

        $data = [];

        foreach ($events as $key => $event) {
            $data[$key] = $event;
            $data[$key]['users_photo'] = $event->users()->take(3)->pluck('photo');
        }

        return $data;
    }
}
