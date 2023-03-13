<?php

namespace App\Models;

use App\Models\Attributes\PermissionAttribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends \Spatie\Permission\Models\Permission
{
    use HasFactory, PermissionAttribute;

    protected $hidden = ['pivot'];
}
