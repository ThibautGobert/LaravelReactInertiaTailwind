<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\Permissions\RoleType;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserPermissionSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(RolePermissionSeeder::class);
        $this->call(CreateAdminUserSeeder::class);

        $this->updateAdminPermissions();
    }

    private function updateAdminPermissions()
    {
        $permissions = Permission::all();
        $adminRole = Role::where('name', RoleType::ADMIN)->first();
        $adminRole->permissions()->sync($permissions);
    }
}
