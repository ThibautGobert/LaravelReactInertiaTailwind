<?php

namespace Database\Seeders;

use App\Enums\Permissions\IngredientPermissionType;
use App\Enums\Permissions\PermissionType;
use App\Enums\Permissions\PlatPermissionType;
use App\Enums\Permissions\UserPermissionType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class UserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        foreach (UserPermissionType::getConstants() as $permission){
            if(!Permission::where(['name' => $permission, 'type' => PermissionType::USER, 'guard_name' => 'web'])->first()) {
                Permission::create([
                    'name' => $permission,
                    'type' => PermissionType::USER,
                    'guard_name' => 'web'
                ]);
            }
        }
    }
}
