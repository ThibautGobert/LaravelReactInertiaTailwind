<?php

namespace App\Models\Attributes;

use Illuminate\Support\Facades\DB;

trait UserAttribute
{
    public function getShortPermissionsAttribute()
    {
        $permissions = $this->getAllPermissions()->pluck('id');
        return DB::table('permissions')->whereIn('id', $permissions)->selectRaw('id, name')->get();
    }
}
