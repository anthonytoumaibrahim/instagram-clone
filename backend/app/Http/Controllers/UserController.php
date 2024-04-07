<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getProfile($username = null)
    {
        $username = $username ?? Auth::user()->username;
        $user = User::where('username', $username)->with('posts.images')->first();

        if ($user) {
            return response()->json([
                'profile' => $user,
                'stats' => [
                    'posts' => $user->posts()->count()
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Profile not found.'
        ], 422);
    }

    public function getProfileSettings()
    {
        $user = User::select('website', 'bio')->find(Auth::id());
        return response()->json($user);
    }

    public function updateProfileSettings(Request $request)
    {
        $request->validate([
            'bio' => 'max:150',
            'website' => 'url|max:255'
        ]);

        $user = User::find(Auth::id());
        $user->updateOrFail([
            'website' => $request->website,
            'bio' => $request->bio
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully.'
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'image' => 'required|image'
        ]);

        $image = $request->file('image');

        if ($image->getSize() > 2000000) {
            return response()->json([
                'success' => false,
                'message' => 'This image size must be under 2 MB.'
            ], 422);
        }

        // Store image
        $fileName = time() . "." . $image->getClientOriginalExtension();
        $path = '/avatars/';
        Storage::disk('public')->putFileAs($path, $image, $fileName);

        $user = User::find(Auth::id());
        $user->updateOrFail([
            'avatar' => config('app.url') . '/storage' . $path . $fileName
        ]);

        return response()->json([
            'success' => true,
            'avatar' => $user->avatar
        ]);
    }
}
