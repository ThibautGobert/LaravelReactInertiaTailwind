<?php

namespace App\Http\Controllers\Shared;

use App\Events\MessageReceivedEvent;
use App\Events\NotificationReceivedEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class MessageController extends Controller
{
    public function send(Request $request)
    {
        $receiver = User::find($request->input('receiver_id'));
        $message = Message::create([
            'sender_id' => auth()->user()->id,
            'receiver_id' => $receiver->id,
            'content' => $request->input('content'),
        ]);

        Event::dispatch(new MessageReceivedEvent($receiver, $message));
        $notification = Notification::create([
            'user_id' => $receiver->id,
            'model_class' => Message::class,
            'model_id' => $message->id,
            'content' => 'Nouveau message reçu de ' . auth()->user()->pseudo,
            'read' => false
        ]);
        Event::dispatch(new NotificationReceivedEvent($receiver, $notification));

        return response()->json(['message' => $message]);
    }

    public function getLastMessages(Request $request)
    {
        $messages = Message::where('sender_id', $request->input('sender_id'))
            ->orWhere('sender_id', $request->input('receiver_id'))
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json(['messages' => $messages]);
    }
}
