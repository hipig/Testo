<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LearnRecordExamShowResource extends JsonResource
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
            'score' => $bank->total_score,
            'time_limit' => $bank->time_limit,
            'subject_id' => $bank->subject_id,
            'breadcrumb' => optional($bank->subject)->ancestors,
            'bank_title' => $bank->title,
            'is_group' => $bank->is_group,
            'items' => $bank->is_group ? $bank->groups : $bank->items
        ];
    }
}
