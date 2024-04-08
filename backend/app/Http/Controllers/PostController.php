<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use App\Models\PostImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function getAllPosts(Request $request)
    {
        $limit = $request->limit ?? 10;

        $posts = Post::whereNot('user_id', Auth::id())->orderBy('created_at', 'DESC')->with('images', 'user:id,username,avatar')->withCount(['likedByUsers', 'comments'])->limit($limit)->get();

        return response()->json($posts);
    }

    public function getComments(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        $post_id = $request->post_id;
        $comments = PostComment::where('post_id', $post_id)->get();

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function comment(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'comment' => 'required|min:10|max:150'
        ]);

        $comment = new PostComment();
        $comment->user_id = Auth::id();
        $comment->post_id = $request->post_id;
        $comment->comment = $request->comment;
        $comment->saveOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Your comment has been posted successfully.'
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'caption' => 'required|max:1200',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048'
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
