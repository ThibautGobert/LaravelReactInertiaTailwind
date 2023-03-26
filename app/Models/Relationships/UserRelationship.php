<?php

namespace App\Models\Relationships;

use App\Models\Message;
use App\Models\Notification;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

trait UserRelationship
{
    public function messages()
    {
        return $this->hasMany(Message::class, 'receiver_id', 'id');
    }
    public function unread_messages()
    {
        return $this->messages()->where('read', false);
    }

    public function user_notifications()
    {
        return $this->hasMany(Notification::class, 'user_id', 'id')->orderBy('created_at');
    }

    public function unread_notifications()
    {
        return $this->notifications()->where('read', false);
    }
}
