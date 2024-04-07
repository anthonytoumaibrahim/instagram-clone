<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required'
        ], [
            'username.required' => 'Please enter your email address, username or mobile number.',
            'password.required' => 'Please enter your password.'
        ]);

        $errors = $validator->errors();

        foreach ($errors->all() as $message) {
            return response()->json([
                'success' => false,
                'message' => $message,
            ], 422);
        }

        $validatePhone = preg_match('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/', $request->username);
        $validateEmail = filter_var($request->username, FILTER_VALIDATE_EMAIL);

        if ($validateEmail) {
            $token = Auth::attempt([
                'email' => $request->username,
                'password' => $request->password
            ]);
        } else if ($validatePhone) {
            $token = Auth::attempt([
                'phone' => $request->username,
                'password' => $request->password
            ]);
        } else {
            $token = Auth::attempt([
                'username' => $request->username,
                'password' => $request->password
            ]);
        }


        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, your password is wrong.',
            ], 422);
        }

        $user = Auth::user();
        return response()->json([
            'success' => true,
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'Bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'emailOrPhone' => 'required|unique:users,email|unique:users,phone',
            'fullName' => 'required',
            'username' => 'required|min:6|max:20|unique:users,username',
            'password' => 'required|min:8'
        ], [
            'emailOrPhone.required' => 'Please enter an email address or mobile number.',
            'username.required' => 'Please enter a username, between 6 and 20 characters.',
            'username.unique' => 'This username is already taken. Please try another.',
            'password.required' => 'Please enter your password.',
            'password.min' => 'Please make sure your password is at least 8 characters long.'
        ]);

        $errors = $validator->errors();

        foreach ($errors->all() as $message) {
            return response()->json([
                'success' => false,
                'message' => $message,
            ], 422);
        }

        // Validate if email or phone nb
        // https://ihateregex.io/expr/phone/
        $validatePhone = preg_match('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/', $request->emailOrPhone);
        $validateEmail = filter_var($request->emailOrPhone, FILTER_VALIDATE_EMAIL);

        if (!$validateEmail && !$validatePhone) {
            return response()->json([
                'success' => false,
                'message' => 'Please enter a valid email address or phone number.',
            ], 422);
        }

        $user = new User();
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->full_name = $request->fullName;
        if ($validateEmail) {
            $user->email = $request->emailOrPhone;
        } else {
            $user->phone = $request->emailOrPhone;
        }
        $user->saveOrFail();

        $token = Auth::login($user);
        return response()->json([
            'success' => true,
            'message' => 'Account created successfully.',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'Bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'success' => true,
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
