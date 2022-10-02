<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $dates = [
        'date',
    ];

    public function users() {
        return $this->belongsToMany(
            User::class,
            'participation',
            'event_id',
            'user_id')
            ->using(Participation::class);
    }

    public function host() {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function joinUser($id) {
        $this->users()->attach($id);
    }

    public function leaveUser($id) {
        $this->users()->detach($id);
        User::whereId($id)->decrement('events');
        $this->decrement('members_count');
    }

    public function scopeIsNotDeleted($query) {
        return $query->where('is_deleted', false);
    }
}
