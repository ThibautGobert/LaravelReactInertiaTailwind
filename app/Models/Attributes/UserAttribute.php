<?php

namespace App\Models\Attributes;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

trait UserAttribute
{
    public function getShortPermissionsAttribute()
    {
        $permissions = $this->getAllPermissions()->pluck('id');
        return DB::table('permissions')->whereIn('id', $permissions)->selectRaw('id, name')->get();
    }

    public function getIsOnlineAttribute() : bool
    {
        return now()->subMinutes(5)->lt(Carbon::parse($this->last_seen));
    }
}
