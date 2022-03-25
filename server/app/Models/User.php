<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Event;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'login',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function events() {
        return $this->belongsToMany(
            Event::class,
            'participation',
            'user_id',
            'event_id')
            ->using(Participation::class);
    }

    public function friends() {
        return $this->belongsToMany(
            User::class,
            'friendship',
            'user_id',
            'friend_id')
            ->withPivot('created_at')
            ->using(Friendship::class);
    }

    public function friendsData() {
        return $this->hasManyThrough(
            User::class,
            Friendship::class,
            'user_id',
            'id',
            'id',
            'friend_id'
        );
    }

    public function addFriend($id) {

        $at = now();
        $friend = User::find($id);


        $this->friends()->attach($id, [
            'created_at' => $at
        ]);

        $friend->friends()->attach($this->id, [
            'created_at' => $at
        ]);

        $this->increment('friends');
        $friend->increment('friends');
    }

    public function deleteFriend($id) {
        $friend = User::find($id);

        $this->friends()->detach($id);
        $this->decrement('friends');
        $friend->friends()->detach($this->id);
        $friend->decrement('friends');
    }

    public function getFriendsShortData() {
        return $this->friendsData()->select('id', 'first_name', 'last_name', 'photo')->get();
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
