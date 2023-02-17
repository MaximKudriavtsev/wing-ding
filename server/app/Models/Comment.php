<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function event() {
        return $this->belongsTo(Event::class);
    }

    public static function createComment($user_id, $event_id, $text) {
        $comment = new self();
        $comment->user_id = $user_id;
        $comment->event_id = $event_id;
        $comment->text = $text;
        $comment->save();
    }
}
