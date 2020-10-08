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
        $bank = optional($this->bank);

        return [
            'id' => $this->id,
            'bank_id' => $this->bank_id,
            'subject_id' => $bank->subject_id,
            'breadcrumb' => optional($bank->subject)->ancestors,
            'bank_title' => $bank->title,
            'items' => $request->bank_type == 'chapter' ? $this->test_question_items : $bank->items
        ];
    }
}
