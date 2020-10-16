<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserError;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserErrorPolicy
{
    use HandlesAuthorization;

    public function own(User $currentUser, UserError $userError)
    {
        return $currentUser->id === $userError->user_id;
    }
}
