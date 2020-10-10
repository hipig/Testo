<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\UserPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\Api\UserRequest;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function store(UserRequest $request)
    {
        $user = User::create([
            'phone' => $request->phone,
            'password' => $request->password,
        ]);

        // 清除验证码缓存
        \Cache::forget($request->verification_key);

        $token = \Auth::guard('api')->login($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => \Auth::guard('api')->factory()->getTTL() * 60
        ]);
    }

    public function me(Request $request)
    {
        return new UserResource($request->user('api'));
    }

    public function updateName(UserPasswordRequest $request)
    {
        $user = $request->user('api');
        $user->name = $request->name;
        $user->save();

        return new UserResource($user);
    }

    public function updatePassword(UserPasswordRequest $request)
    {
        $user = $request->user('api');
        $user->password = $request->password;
        $user->save();

        return new UserResource($user);
    }
}
