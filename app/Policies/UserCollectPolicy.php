<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserCollect;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserCollectPolicy
{
    use HandlesAuthorization;

    public function own(User $currentUser, UserCollect $userCollect)
    {
        return $currentUser->id === $userCollect->user_id;
    }
}
