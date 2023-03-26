<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;


class NotificationController extends Controller
{
    public function getUnread(Request $request, User $user)
    {
        return response()->json(['notifications' => $user->user_notifications]);
    }
}
