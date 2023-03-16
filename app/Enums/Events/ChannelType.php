<?php

namespace App\Enums\Events;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class ChannelType extends Enum
{
    use EnumTrait;
    const Message = 'Message.';
    const Notification = 'Notification.';
}
