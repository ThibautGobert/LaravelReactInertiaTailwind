<?php

namespace Database\Seeders;

use App\Enums\Permissions\RoleType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(!User::where('email', 'admin@admin.com')->first()) {
            $user = User::create([
                'name' => 'admin',
                'firstname' => 'admin',
                'pseudo' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('password'),
            ]);
            $user->assignRole(RoleType::ADMIN);
        }
    }
}
