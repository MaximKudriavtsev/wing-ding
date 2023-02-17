<?php

namespace App\Http\Controllers;

use App\Mail\EmailVerification;
use App\Models\Friendship;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

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

            $events = $user->events()->isNotDeleted()->get();
            $data = [];

            foreach ($events as $key => $event) {
                $data[$key] = $event;
                $data[$key]['members_photos'] = $event->users()->take(3)->pluck('photo');
                $data[$key]['comments_count'] = $event->commentsCount();
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

    public function changeProfile(Request $request) {

        try {

            $validator = Validator::make($request->all(), [
                'photo' => 'image'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'error' => 'photo file is not an image'
                ]);
            }

            $user = auth()->user();
            $is_changed = false;

            if ($request->input('first_name')) {
                $user->first_name = $request->input('first_name');
                $is_changed = true;
            }

            if ($request->input('last_name')) {
                $user->last_name = $request->input('last_name');
                $is_changed = true;
            }

            if ($request->input('description')) {
                $user->description = $request->input('description');
                $is_changed = true;
            }

            if ($request->input('birth_date')) {
                $user->birth_date = $request->input('birth_date');
                $is_changed = true;
            }

            if ($request->file('photo')) {
                $filename = $request->file('photo')->getClientOriginalName();
                $filename_without_extension = pathinfo($filename, PATHINFO_FILENAME);
                $extension = $request->file('photo')->getClientOriginalExtension();

                if (!$extension || $extension == '') {
                    $extension = 'jpg';
                }

                $new_filename = sha1($filename_without_extension . time()) . '.' . $extension;

                $request->file('photo')->storeAs('public/avatar', $new_filename);

                $user->photo = config('app.url') . 'storage/avatar/' . $new_filename;
                $is_changed = true;
            }

            if (!$is_changed) {
                return \response()->json([
                   'status' => 'error',
                   'error' => 'no changes'
                ]);
            }

            $user->save();

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

    public function selfEvents() {

        try {
            $user = auth()->user();

            $events = $user->events()->isNotDeleted()->get();

            $data = [];

            foreach ($events as $key => $event) {
                $data[$key] = $event;
                $data[$key]['members_photos'] = $event->users()->take(3)->pluck('photo');
                $data[$key]['comments_count'] = $event->commentsCount();
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

    public function emailVerify() {

        try {
            $user = auth()->user();

            $code = random_int(0, 999999);
            $code = strval($code);
            $code = str_repeat('0', 6 - strlen($code)) . $code;

            Cache::put("email_verify_$user->id", $code);

            Mail::to($user)->send(new EmailVerification($code));

            return \response()->json(['status' => 'success']);

        } catch (\Throwable $exception) {

            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);

        }
    }

    public function emailCheck(Request $request) {

        try {

            $user = auth()->user();
            $code = $request->get('code');

            $true_code = Cache::get("email_verify_$user->id");

            if (!$true_code) {

                return \response()->json([
                    'status' => 'error',
                    'error' => 'verification has not started yet'
                ]);

            }

            if ($true_code === $code) {

                $user->email_verified_at = now();
                $user->save();

                $is_verified = true;

                Cache::pull("email_verify_$user->id");
            } else {
                $is_verified = false;
            }

            return \response()->json([
                'status' => 'success',
                'is_verified' => $is_verified
            ]);

        } catch (\Throwable $exception) {

            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
            ]);

        }
    }

    public function uploadPhoto(Request $request) {
        $request->validate([
            'photo' => 'required|image'
        ]);

        $user = auth()->user();

        $filename = $request->file('photo')->getClientOriginalName();
        $filename_without_extension = pathinfo($filename, PATHINFO_FILENAME);
        $extension = $request->file('photo')->getClientOriginalExtension();
        $new_filename = sha1($filename_without_extension . time()) . '.' . $extension;

        $request->file('photo')->storeAs('public/avatar', $new_filename);

        $user->photo = 'avatar/' . $new_filename;
        $user->save();

        return [
            'status' => 'success',
            'photo' => $user->photo
        ];
    }

    public function search(Request $request) {
        if (!$request->input('value')) {
            return [
                'status' => 'error',
                'error' => 'no value for search'
            ];
        }

        $value = $request->input('value');

        $users = User::where('first_name', 'like', "%$value%")
            ->orWhere('last_name', 'like', "%$value%")
            ->orWhereRaw("CONCAT(last_name, ' ', first_name) like '%$value%'")
            ->orWhereRaw("CONCAT(first_name, ' ', last_name) like '%$value%'")
            ->take(config('common.user_search_count'))->get();

        return [
            'status' => 'success',
            'users' => $users
        ];
    }
}
