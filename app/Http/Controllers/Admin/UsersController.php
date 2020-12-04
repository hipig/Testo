<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->latest()
            ->paginate($request->page_size ?? config('api.page_size'));

        return UserResource::collection($users);
    }

    public function show(Request $request, User $user)
    {
        return UserResource::make($user);
    }

    public function destroy(Request $request, User $user)
    {
        $user->delete();

        return response(null, 204);
    }
}
