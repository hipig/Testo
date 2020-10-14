<?php

namespace App\Policies;

use App\Models\LearnRecord;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LearnRecordPolicy
{
    use HandlesAuthorization;

    public function own(User $currentUser, LearnRecord $record)
    {
        return $currentUser->id === $record->user_id;
    }
}
