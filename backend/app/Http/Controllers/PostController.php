<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\PostLike;
use App\Models\PostImage;
use App\Models\PostComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function getAllPosts(Request $request)
    {
        $limit = $request->limit ?? 10;

        $followers = User::find(Auth::id())->following->pluck('id');

        $posts = Post::whereNotIn('user_id', $followers->push(Auth::id()))->orderBy('created_at', 'DESC')->with('images', 'user:id,username,avatar')->withCount(['likedByUsers', 'comments'])->limit($limit)->get();

        $posts->each(function ($post) {
            $like = PostLike::where("post_id", $post->id)->where("user_id", Auth::id())->first();
            $post->liked_by_user = $like ? true : false;
        });
        return response()->json($posts);
    }

    public function likePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        $post_id = $request->post_id;

        $user = User::find(Auth::id());

        $like_exists = $user->likedPosts()->find($post_id);

        if ($like_exists) {
            $user->likedPosts()->detach($post_id);
        } else {
            $user->likedPosts()->attach($post_id);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function getComments(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        $post_id = $request->post_id;
        $comments = PostComment::where('post_id', $post_id)->with('user:id,username,avatar')->get();

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function comment(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'comment' => 'required|max:150'
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
            if ($index === 5) {
                break;
            }
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
