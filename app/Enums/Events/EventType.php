<?php

namespace App\Enums\Events;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class EventType extends Enum
{
    use EnumTrait;
    const MessageReceived = 'MessageReceivedEvent';
    const NotificationReceived = 'NotificationReceivedEvent';
}
