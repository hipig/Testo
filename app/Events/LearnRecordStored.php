<?php

namespace App\Events;

use App\Models\LearnRecordItem;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LearnRecordStored
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $recordItem = null;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(LearnRecordItem $recordItem)
    {
        $this->recordItem = $recordItem;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
