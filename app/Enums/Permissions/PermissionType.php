<?php

namespace App\Enums\Permissions;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class PermissionType extends Enum
{
    use EnumTrait;
    const USER = 1;
    const ROLE = 2;
}
