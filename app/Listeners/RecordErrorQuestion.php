<?php

namespace App\Listeners;

use App\Events\LearnRecordStored;
use App\Models\Question;
use App\Models\SubjectErrorItem;
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

        SubjectErrorItem::updateOrCreate([

        ]);
    }
}
