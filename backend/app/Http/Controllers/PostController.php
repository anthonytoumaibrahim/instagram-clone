<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'caption' => 'required|min:12|max:1200',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $images = $request->file('images');

        $newPost = new Post();
        $newPost->caption = $request->caption;
        $newPost->user_id = Auth::id();
        $newPost->saveOrFail();

        // Upload each image
        $index = 0;
        foreach ($images as $image) {
            $index++;
            // Store image
            $fileName = time() . "_" . $index . "." . $image->getClientOriginalExtension();
            $path = '/posts/';
            Storage::disk('public')->putFileAs($path, $image, $fileName);

            $postImage = new PostImage();
            $postImage->image_url = config('app.url') . '/storage' . $path . $fileName;
            $postImage->post_id = $newPost->id;
            $postImage->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Your post has been created successfully!'
        ]);
    }
}
