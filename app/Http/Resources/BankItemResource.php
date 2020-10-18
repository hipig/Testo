<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class BankItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $userId = optional($request->user('api'))->id;
        $is_collect = $this->collects()->where('user_id', $userId)->exists();
        $notes = $this->when($request->routeIs('api.v1.userNotes.index.detail'), UserNoteResource::collection($this->notes()->where('user_id', $userId)->get()));

        return [
            'id' => $this->id,
            'subject_id' => optional($this->bank)->subject_id,
            'bank_id' => $this->bank_id,
            'group_id' => $this->group_id,
            'question_id' => $this->question_id,
            'question' => $this->question,
            'question_type' => $this->question_type,
            'score' => $this->score,
            'is_collect' => $is_collect,
            'record' => $this->record ?? null,
            'notes' => $notes,
            'created_at' => Carbon::make($this->created_at)->format('Y-m-d H:i')
        ];
    }
}
