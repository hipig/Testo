<?php

namespace App\Events;

use App\Models\LearnRecord;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LearnRecordSubmitted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $record = null;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(LearnRecord $record)
    {
        $this->record = $record;
    }

    public function getRecord()
    {
        return $this->record;
    }
}
