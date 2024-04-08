<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\PostLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function getFeed()
    {
        $following = User::find(Auth::id())->following->pluck('id');

        $posts = Post::whereIn('user_id', $following)->orderBy('created_at', 'DESC')->with('images', 'user:id,username,avatar')->withCount(['likedByUsers', 'comments'])->get();

        $posts->each(function ($post) {
            $like = PostLike::where("post_id", $post->id)->where("user_id", Auth::id())->first();
            $post->liked_by_user = $like ? true : false;
        });

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function follow(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id'
        ]);
        $follow_id = $request->id;

        $user = User::find(Auth::id());

        $follow_exists = $user->following()->find($follow_id);

        if ($follow_exists) {
            $user->following()->detach($follow_id);
        } else {
            $user->following()->attach($follow_id);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
