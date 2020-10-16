<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserNoteResource extends JsonResource
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
            'bank_item_id' => $this->bank_item_id,
            'question_id' => $this->question_id,
            'subject_title' => optional($this->subject)->title,
            'question_title' => optional($this->question)->title,
            'question_type' => $this->question_type,
            'content' => $this->content,
            'upload_ids' => $this->upload_ids,
            'upload_items' => $this->upload_items,
            'bank_item' => BankItemResource::make($this->whenLoaded('bankItems')),
            'created_at' => Carbon::make($this->created_at)->format('Y-m-d H:i')
        ];
    }
}
