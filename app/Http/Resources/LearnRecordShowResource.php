<?php

namespace App\Http\Resources;

use App\Models\LearnRecord;
use App\Models\Question;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

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
        switch ($this->type) {
            case LearnRecord::CHAPTER_TEST:
                $items = $this->question_items;
                break;
            case LearnRecord::MOCK_EXAM:
            case LearnRecord::OLD_EXAM:
                $items = $bank->is_group ? $bank->groups : $bank->items;
                break;
            case LearnRecord::DAILY_TEST:
                $items = $bank->items;
                break;
        }

        $items = $items->map(function ($item) use ($bank) {
           if ($bank->is_group) {
               $item->items = $item->items->map(function ($i) {
                   $i->record = optional(Auth::guard('api')->user())
                       ->recordItems()
                       ->where('record_id', $this->id)
                       ->where('bank_item_id', $i->id)
                       ->first();
                   return $i;
               });
           } else {
               $item->record = optional(Auth::guard('api')->user())
                   ->recordItems()
                   ->where('record_id', $this->id)
                   ->where('bank_item_id', $item->id)
                   ->first();
           }

           return $item;
        });


        $resultScore = 0;
        foreach (Question::$typeMap as $key => $value) {
            $result[$key] = $this->getItemsResult($key);
            $resultScore += $result[$key]['score'] ?? 0;
        }

        return [
            'id' => $this->id,
            'bank_id' => $this->bank_id,
            'subject_id' => $bank->subject_id,
            'score' => $bank->total_score,
            'time_limit' => $bank->time_limit,
            'is_group' => $bank->is_group,
            'bank_title' => $bank->title,
            'type' => $this->type,
            'quiz_mode' => $this->quiz_mode,
            'done_time' => $this->done_time,
            'breadcrumb' => optional($bank->subject)->ancestors,
            'items' => $items,
            'result' => $this->when($this->withResult, $result),
            'result_score' => $resultScore
        ];
    }
}
