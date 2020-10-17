<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BankResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'subject_id' => $this->subject_id,
            'parent_id' => $this->parent_id,
            'title' => $this->title,
            'type' => $this->type,
            'is_free' => $this->is_free,
            'price' => $this->price,
            'is_group' => $this->is_group,
            'time_limit' => $this->time_limit,
            'total_score' => $this->total_score,
            'total_count' => $this->total_count,
            'source' => $this->source,
            'remark' => $this->remark,
            'children' => self::collection($this->whenLoaded('children')),
            'items' => $this->items ? BankItemResource::collection($this->items) : null
        ];
    }
}
