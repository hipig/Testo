<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LearnRecordTestShowResource extends JsonResource
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
            'bank_id' => $this->bank_id,
            'subject_id' => optional($this->bank)->subject_id,
            'breadcrumb' => optional($this->bank->subject)->ancestors,
            'bank_title' => optional($this->bank)->title,
            'items' => $this->test_question_items
        ];
    }
}
