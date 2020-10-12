<?php

namespace App\Listeners;

use App\Events\LearnRecordSubmitted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateRecordCountAndScore
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
     * @param  LearnRecordSubmitted  $event
     * @return void
     */
    public function handle(LearnRecordSubmitted $event)
    {
        $record = $event->getRecord();

        $record->load('items', 'items.bankItem');
        $record->done_count = $record->items->whereNotNull('is_right')->count();
        $record->score = $record->items->sum(function ($item) {
            return optional($item->bank_item)->score ?? 0;
        });
        $record->save();
    }
}
