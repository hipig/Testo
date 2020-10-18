<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BankGroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $record_id = $this->transmit_record_id;
        $recordItemQuery = optional($request->user('api'))->recordItems();
        $items = $this->items->map(function ($item) use ($recordItemQuery, $record_id) {
            $item->record = $recordItemQuery
                ->where('record_id', $record_id)
                ->where('bank_item_id', $item->id)
                ->first();
            return $item;
        });

        return [
            'id' => $this->id,
            'bank_id' => $this->id,
            'title' => $this->title,
            'item_type' => $this->item_type,
            'item_score' => $this->item_score,
            'item_count' => $this->item_count,
            'items' => BankItemResource::collection($items)
        ];
    }
}
