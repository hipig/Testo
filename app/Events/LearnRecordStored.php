<?php

namespace App\Events;

use Illuminate\Database\Eloquent\Model;
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

    protected $recordItem = null;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Model $recordItem)
    {
        $this->recordItem = $recordItem;
    }

    public function getRecordItem()
    {
        return $this->recordItem;
    }
}
