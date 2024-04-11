<?php

namespace Database\Seeders;

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
        // Factory
        User::factory(12)->create();
        User::factory()->create([
            'full_name' => fake('en_US')->name('female'),
            'avatar' => config('app.url') . '/storage/avatars/ai/female.webp'
        ]);
        User::factory()->create([
            'full_name' => fake('en_US')->name('male'),
            'avatar' => config('app.url') . '/storage/avatars/ai/male.webp'
        ]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
