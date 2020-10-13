<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class LearnRecordResource extends JsonResource
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
            'type' => $this->type,
            'quiz_mode' => $this->quiz_mode,
            'bank_title' => $bank->title,
            'subject_title' => optional($bank->subject)->title,
            'total_count' => $this->total_count,
            'done_count' => $this->done_count,
            'is_end' => $this->is_end,
            'score' => $this->score,
            'created_at' => Carbon::make($this->created_at)->format('Y-m-d H:i:s')
        ];
    }
}
