<?php

namespace App\Http\Resources;

use App\Models\Bank;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
        $bankItemIds = ($this->has_children && $this->type === Bank::CHAPTER_TEST ? $this->childrenItems() : $this->items())->pluck('bank_items.id');
        $record_count = 0;
        if (Auth::guard('api')->check()) {
            $record_count = optional($request->user('api'))->recordItems()
                    ->whereIn('bank_item_id', $bankItemIds)
                    ->whereNotNull('answer')
                    ->count(DB::raw('distinct bank_item_id'));
        }


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
            'record_count' => $record_count,
            'source' => $this->source,
            'remark' => $this->remark,
            'children' => self::collection($this->whenLoaded('children')),
            'items' => $this->when($this->type === Bank::DAILY_TEST, $this->limit3Items)
        ];
    }
}
