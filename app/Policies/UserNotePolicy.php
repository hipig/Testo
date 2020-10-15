<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserNote;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserNotePolicy
{
    use HandlesAuthorization;

    public function own(User $currentUser, UserNote $userNote)
    {
        return $currentUser->id === $userNote->user_id;
    }
}
