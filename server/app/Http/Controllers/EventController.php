<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Models\Participation;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function create() {
        try {
            $req = \request();

            $user = auth()->user();

            $event = new Event();
            $event->title = $req['title'];
            $event->place = $req['place'];
            $event->host_id = $user->id;
            $event->date = $req['date'];
            $event->save();

            $event->joinUser($user->id);
            $event->increment('members_count');
            User::whereId($user->id)->increment('events');


            return \response()->json([
                'status' => 'success',
                'id' => $event->id
            ]);
        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage(),
            ]);
        }
    }

    public function join($id) {
        try {
            $user = auth()->user();

            if (Participation::whereEventId($id)->whereUserId($user->id)->exists()) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'user exist'
                ]);
            }

            $event = Event::find($id);
            $event->joinUser($user->id);
            $event->increment('members_count');
            User::whereId($user->id)->increment('events');
            return \response()->json([
                'status' => 'success',
            ]);
        } catch (\Throwable $ex) {
            return \response()->json([
                'status' => 'error',
                'error' => $ex->getMessage(),
            ]);
        }
    }

    public function getUsers($id) {
        try {
            $ids = Participation::whereEventId($id)->pluck('user_id');
            return \response([
                'status' => 'success',
                'members' => User::whereIn('id', $ids)->get()
            ]);
        } catch (\Throwable $ex) {
            return \response()->json([
               'status' => 'error',
               'error' => $ex->getMessage()
            ]);
        }
    }

    public function get($id) {
        $event = Event::find($id);
        $event['host'] = $event->host()->select('id', 'photo', 'first_name', 'last_name')->first();
        $event['members_photo'] = $event->users()->take(3)->pluck('photo');
        return \response()->json($event);
    }
}