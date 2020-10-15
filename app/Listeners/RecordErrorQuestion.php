<?php

namespace App\Listeners;

use App\Events\LearnRecordItemStored;
use App\Models\Question;
use App\Models\UserError;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;

class RecordErrorQuestion
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  LearnRecordItemStored  $event
     * @return void
     */
    public function handle(LearnRecordItemStored $event)
    {
        $recordItem = $event->getRecordItem();

        if (in_array($recordItem->question_type, Question::$checkRightType) && $recordItem->is_right === false) {
            $userError = optional(Auth::guard('api')->user())->errors();
            $userError->updateOrCreate([
                'subject_id' => optional($recordItem->bankItem)->subject_id,
                'bank_id' => $recordItem->bank_id,
                'bank_item_id' => $recordItem->bank_item_id,
                'question_id' => $recordItem->question_id,
                'question_type' => $recordItem->question_type
            ]);
        }
    }
}
