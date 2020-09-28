<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LearnRecordTestResource extends JsonResource
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
            'breadcrumb' => optional($this->bank->subject)->ancestors,
            'bank_title' => optional($this->bank)->title,
            'questions' => $this->test_question_items
        ];
    }
}
