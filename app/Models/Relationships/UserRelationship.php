<?php

namespace App\Models\Relationships;

use App\Models\Message;
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
}
