<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'caption',
        'user_id'
    ];

    protected $appends = ['liked_by_user'];

    protected $with = ['images', 'user:id,username,avatar'];

    protected $withCount = ['likedByUsers', 'comments'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(PostImage::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'post_likes', 'post_id', 'user_id');
    }

    public function getLikedByUserAttribute()
    {
        $like = PostLike::where("post_id", $this->id)->where("user_id", Auth::id())->first();
        return $like ? true : false;
    }
}
