<?php

namespace App\Http\Resources;

use App\Models\Question;
use Illuminate\Http\Resources\Json\JsonResource;

class LearnRecordShowResource extends JsonResource
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

        if ($bank->is_group) {
            $groups = $this->bank_items->map(function ($item) {
               $item->transmit_record_id = $this->id;
               return $item;
            });
            $items = BankGroupResource::collection($groups);
        } else {
            $bankItems = $this->bank_items->map(function ($item) use ($request) {
                $item->record = optional($request->user('api'))->recordItems()
                    ->where('record_id', $this->id)
                    ->where('bank_item_id', $item->id)
                    ->first();
                return $item;
            });
            $items = BankItemResource::collection($bankItems);
        }

        foreach (Question::$typeMap as $key => $value) {
            $result[$key] = $this->getItemsResult($key);
        }

        return [
            'id' => $this->id,
            'bank_id' => $bank->id,
            'subject_id' => $bank->subject_id,
            'score' => $bank->total_score,
            'time_limit' => $bank->time_limit,
            'total_count' => $bank->total_count,
            'is_group' => $bank->is_group,
            'bank_title' => $bank->title,
            'type' => $this->type,
            'quiz_mode' => $this->quiz_mode,
            'done_time' => $this->done_time,
            'breadcrumb' => optional($bank->subject)->ancestors,
            'items' => $items,
            'result' => $this->when($this->withResult, $result),
            'result_score' => $this->score
        ];
    }
}
