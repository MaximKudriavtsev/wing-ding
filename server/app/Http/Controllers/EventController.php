<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use App\Models\Participation;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function create(Request $request) {
        try {

            $validator = Validator::make($request->all(), [
                'img' => 'image'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'error' => 'img file is not an image'
                ]);
            }

            $user = auth()->user();

            $event = new Event();
            $event->title = $request->input('title');
            $event->place = $request->input('place');
            $event->host_id = $user->id;
            $event->date = $request->input('date');

            if ($request->file('img')) {
                $filename = $request->file('img')->getClientOriginalName();
                $filename_without_extension = pathinfo($filename, PATHINFO_FILENAME);
                $extension = $request->file('img')->getClientOriginalExtension();

                if (!$extension || $extension == '') {
                    $extension = 'jpg';
                }

                $new_filename = sha1($filename_without_extension . time()) . '.' . $extension;

                $request->file('img')->storeAs('public/event', $new_filename);
                $event->img = config('app.url') . 'storage/event/' . $new_filename;
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

            $event = Event::isNotDeleted()->find($id);

            if (!$event) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'event not found'
                ]);
            }

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
            $event = Event::isNotDeleted()->find($id);

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

            if (Event::whereId($id)->isNotDeleted()->doesntExist()) {
                return \response()->json([
                    'status' => 'error',
                    'error' => 'event not found'
                ]);
            }

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

        $event = Event::isNotDeleted()->find($id);

        if (!$event) {
            return \response()->json([
                'status' => 'error',
                'error' => 'event not found'
            ]);
        }

        if ($event->host_id === $user->id) {
            $event['is_host'] = true;
        } else {
            $event['is_host'] = false;
        }

        $event['host'] = $event->host()->select('id', 'photo', 'first_name', 'last_name')->first();
        $event['members_photos'] = $event->users()->take(3)->pluck('photo');
        $event['is_member'] = $event->users()->whereId($user->id)->exists();
        return \response()->json($event);
    }

    public function getIsHost($id) {
        $user_id = auth()->id();
        $event = Event::isNotDeleted()->find($id);

        if (!$event) {
            return \response()->json([
               'status' => 'error',
               'error' => 'event not found'
            ]);
        }

        if ($event->host_id === $user_id) {
            $is_host = true;
        } else {
            $is_host = false;
        }

        return \response()->json([
            'status' => 'success',
            'is_host' => $is_host
        ]);
    }

    public function deleteEvent($id) {

        $user_id = auth()->id();
        $event = Event::isNotDeleted()->find($id);

        if (!$event) {
            return \response()->json([
                'status' => 'error',
                'error' => 'event not found'
            ]);
        }

        if ($event->host_id !== $user_id) {
            return \response()->json([
                'status' => 'error',
                'error' => 'user isn`t the host of this event'
            ]);
        }

        $event->users()->decrement('events');
        $event->is_deleted = true;
        $event->save();

        return \response()->json([
            'status' => 'success'
        ]);
    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'img' => 'image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'error' => 'img file is not an image'
            ]);
        }

        $user = auth()->user();
        $event = Event::isNotDeleted()->find($request->input('event_id'));

        if (!$event) {
            return response()->json([
                'status' => 'error',
                'error' => 'event not found ' . $request->input('event_id')
            ]);
        }

        if ($user->id !== $event->host_id) {
            return response()->json([
                'status' => 'error',
                'error' => 'user isn`t the host of this event'
            ]);
        }

        if ($request->input('title')) {
            $event->title = $request->input('title');
        }

        if ($request->input('place')) {
            $event->place = $request->input('place');
        }

        if ($request->input('date')) {
            $event->date = $request->input('date');
        }

        if ($request->input('text')) {
            $event->text = $request->input('text');
        }

        $old_file = '';

        if ($request->file('img')) {

            $old_file = $event->img;

            $filename = $request->file('img')->getClientOriginalName();
            $filename_without_extension = pathinfo($filename, PATHINFO_FILENAME);
            $extension = $request->file('img')->getClientOriginalExtension();

            if (!$extension || $extension == '') {
                $extension = 'jpg';
            }

            $new_filename = sha1($filename_without_extension . time()) . '.' . $extension;

            $request->file('img')->storeAs('public/event', $new_filename);
            $event->img = config('app.url') . 'storage/event/' . $new_filename;
        }

        $event->save();

        if ($old_file) {
            $old_file = str_replace(config('app.url'), '', $old_file);
            unlink($old_file);
        }

        return \response()->json([
            'status' => 'success'
        ]);

    }
}
