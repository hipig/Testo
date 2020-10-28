<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\AdminUserRequest;
use App\Http\Resources\AdminUserResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(AdminUserRequest $request)
    {
        $token = $request->access_token;
        return $this->respondWithToken($token)->setStatusCode(201);
    }

    public function me(Request $request)
    {
        return AdminUserResource::make($request->user('admin'));
    }

    public function logout()
    {
        auth('admin')->logout();
        return response(null, 204);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => \Auth::guard('admin')->factory()->getTTL() * 60
        ]);
    }
}
