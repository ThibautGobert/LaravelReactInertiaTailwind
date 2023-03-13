<?php

namespace App\Enums\Permissions;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class UserPermissionType extends Enum
{
    use EnumTrait;
   const MANAGE_USER = 'user manage';
   const EDIT_USER = 'user edit';
   const CREATE_USER = 'user create';
   const DELETE_USER = 'user delete';


}
