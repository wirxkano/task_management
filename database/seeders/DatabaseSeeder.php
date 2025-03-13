<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Young Coder',
            'email' => 'letmeseeyoureyes@example.com',
            'password'=> bcrypt('123456789'),
            'email_verified_at' => time(),
        ]);

        Project::factory()->count(5)->hasTasks(4)->create();
    }
}
