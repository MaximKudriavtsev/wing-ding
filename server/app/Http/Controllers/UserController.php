<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
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

                $authorized = auth()->user();
                $is_friend = Friendship::where('user_id', $authorized->id)->where('friend_id', $id)->exists();

                $user['is_friend'] = $is_friend;

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

    public function getFriends() {
        try {
            $user = auth()->user();

            return \response()->json([
                'status' => 'success',
                'friends' => $user->getFriendsShortData()
            ]);

        } catch (\Throwable $exception) {
            return \response()->json([
               'status' => 'error',
               'error' => $exception->getMessage()
            ]);
        }
    }

    public function getAnotherUserFriends($id) {
        try {

            $another_user = User::find($id);

            if ($another_user) {
                return \response()->json([
                    'status' => 'success',
                    'friends' => $another_user->getFriendsShortData()
                ]);
            } else {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'no such user'
                ]);
            }

        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);
        }
    }

    public function getAnotherUserEvents($id) {

        try {
            $user = User::find($id);

            if (!$user) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'no such user'
                ]);
            }

            $events = $user->events()->get();
            $data = [];

            foreach ($events as $key => $event) {
                $data[$key] = $event;
                $data[$key]['members_photo'] = $event->users()->take(3)->pluck('photo');
            }

            return \response()->json([
                'status' => 'success',
                'events' => $data
            ]);

        } catch (\Throwable $exception) {
            return \response()->json([
               'status' => 'error',
               'error' => $exception->getMessage()
            ]);
        }

    }

    public function selfEvents() {

        try {
            $user = auth()->user();

            $events = $user->events()->get();

            $data = [];

            foreach ($events as $key => $event) {
                $data[$key] = $event;
                $data[$key]['members_photo'] = $event->users()->take(3)->pluck('photo');
            }

            return \response()->json([
                'status' => 'success',
                'events' => $data
            ]);
        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);
        }

    }

    public function addFriend($id) {
        try {
            $user = auth()->user();

            if (Friendship::where('user_id', $user->id)->where('friend_id', $id)->exists()) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'already is friend'
                ]);
            }

            $user->addFriend($id);

            return \response()->json([
                'status' => 'success'
            ]);

        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);
        }
    }

    public function deleteFriend($id) {
        try {
            $user = auth()->user();

            if (!Friendship::where('user_id', $user->id)->where('friend_id', $id)->exists()) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'users are not friends'
                ]);
            }

            $user->deleteFriend($id);

            return \response()->json([
                'status' => 'success'
            ]);
        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);
        }
    }
}
