<?php

namespace App\Enums\Permissions;

use App\Enums\Traits\EnumTrait;
use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

class RolePermissionType extends Enum
{
    use EnumTrait;
   const MANAGE_ROLE = 'role manage';
   const EDIT_ROLE = 'role edit';
   const CREATE_ROLE = 'role create';
   const DELETE_ROLE = 'role delete';

   public static function getDescription(mixed $value): string
   {
       switch (app()->getLocale()) {
           case 'en' :
               switch ($value) {
                   case self::MANAGE_ROLE:
                       return 'Manage role';
                   case self::EDIT_ROLE:
                       return 'Edit role';
                   case self::CREATE_ROLE:
                       return 'Create role';
                   case self::DELETE_ROLE:
                       return 'Delete role';
               }
               break;
           case 'fr' :
               switch ($value) {
                   case self::MANAGE_ROLE:
                       return 'Gestion role';
                   case self::EDIT_ROLE:
                       return 'Édition role';
                   case self::CREATE_ROLE:
                       return 'Création role';
                   case self::DELETE_ROLE:
                       return 'Suppression role';
               }
               break;
       }
   }
}
