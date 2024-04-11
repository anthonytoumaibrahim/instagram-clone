<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostImage;
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
            'avatar' => config('app.url') . '/images/ai/female.webp'
        ]);
        User::factory()->create([
            'full_name' => fake('en_US')->name('male'),
            'avatar' => config('app.url') . '/images/ai/male.webp'
        ]);

        Post::factory()->create([
            'caption' => 'I love cats!'
        ]);
        PostImage::factory()->create([
            'image_url' => config('app.url') . '/images/ai/cat.jpg',
            'post_id' => 1
        ]);
        PostImage::factory()->create([
            'image_url' => config('app.url') . '/images/ai/cat2.png',
            'post_id' => 1
        ]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
