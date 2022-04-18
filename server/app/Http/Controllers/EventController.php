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

            if (isset($req['photo'])) {
                $event->photo = $req['photo'];
            }

            if (isset($req['text'])) {
                $event->text = $req['text'];
            }

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

    public function leave($id) {
        try {
            $user = auth()->user();
            $event = Event::find($id);

            if ($event) {
                $event->leaveUser($user->id);


                return \response()->json([
                    'status' => 'success'
                ]);
            } else {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'no such event'
                ]);
            }

        } catch (\Throwable $exception) {
            return \response()->json([
                'status' => 'error',
                'error' => $exception->getMessage()
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

        $user = auth()->user();

        $event = Event::find($id);
        $event['host'] = $event->host()->select('id', 'photo', 'first_name', 'last_name')->first();
        $event['members_photos'] = $event->users()->take(3)->pluck('photo');
        $event['is_member'] = $event->users()->whereId($user->id)->exists();
        return \response()->json($event);
    }
}
