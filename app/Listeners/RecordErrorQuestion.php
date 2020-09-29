<?php

namespace App\Listeners;

use App\Events\LearnRecordStored;
use App\Models\Question;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
     * @param  LearnRecordStored  $event
     * @return void
     */
    public function handle(LearnRecordStored $event)
    {
        $recordItem = $event->getRecordItem();
        // TODO::记录错题
    }
}
