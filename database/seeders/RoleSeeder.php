<?php

namespace Database\Seeders;

use App\Enums\Permissions\RoleType;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (RoleType::getConstants() as $role){
            if(!Role::where(['name' => $role, 'guard_name' => 'web'])->first()) {
                Role::create([
                    'name' => $role,
                    'guard_name' => 'web'
                ]);
            }
        }
    }
}
