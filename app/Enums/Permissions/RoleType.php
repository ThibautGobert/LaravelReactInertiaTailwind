<?php

namespace App\Enums\Permissions;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class RoleType extends Enum
{
    use EnumTrait;

    const ADMIN = 'admin';
    const USER = 'user';

}
