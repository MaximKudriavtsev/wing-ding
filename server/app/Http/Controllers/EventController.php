<?php

namespace App\Http\Controllers;

use App\Models\Event;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function create() {
        try {
            $req = \request();

            $event = new Event();
            $event->title = $req['title'];
            $event->place = $req['place'];
            $event->host_id = 1;
            $event->date = now();
            $event->save();

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

    public function get($id) {
        return \response()->json(Event::find($id));
    }
}
