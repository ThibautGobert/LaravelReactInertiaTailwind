<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use JamesMills\LaravelTimezone\Facades\Timezone;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['sender_id', 'receiver_id', 'content', 'read'];

    protected $appends = ['sent_at'];

    public function getSentAtAttribute()
    {
        return Timezone::convertToLocal($this->created_at, 'd/m/Y H:i');
    }
}
