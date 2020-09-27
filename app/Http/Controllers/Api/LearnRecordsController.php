<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LearnRecordTestRequest;
use App\Http\Resources\LearnRecordResource;
use App\Models\Bank;
use App\Models\LearnRecord;
use App\Models\LearnRecordItem;
use Illuminate\Http\Request;

class LearnRecordsController extends Controller
{
    public function testStore(LearnRecordTestRequest $request)
    {
        $type = $request->type;
        $number = $request->number;

        $bank = Bank::query()->findOrFail($request->bank_id);
        $bankItems = $bank->has_children ? $bank->childrenItems() : $bank->items();
        $columnPrefix = $bank->has_children ? 'bank_items.' : '';
        switch ($request->range) {
            case 'all':
                $query = $bankItems;
                break;
            case 'undone':
                $doneIds = $bank->recordItems()->pluck('bank_item_id')->toArray();
                $query = $bankItems->whereNotIn($columnPrefix.'id', $doneIds);
                break;
            case 'done':
                $doneIds = $bank->recordItems()->pluck('bank_item_id')->toArray();
                $query = $bankItems->whereIn($columnPrefix.'id', $doneIds);
                break;
            case 'error':
                $errorIds = $bank->recordItems()->where('is_right', false)->pluck('bank_item_id')->toArray();
                $query = $bankItems->whereIn($columnPrefix.'id', $errorIds);
        }

        if ($type != 0) {
            $query->where($columnPrefix.'type', $type);
        }

        $idPluck = $query->pluck($columnPrefix.'id');
        $count = $idPluck->count();
        $ids = $idPluck->random($number >= $count ? $count : $number);

        $record = LearnRecord::create([
            'user_id' => $request->user()->id,
            'bank_id' => $bank->id,
            'type' => $bank->type,
            'question_ids' => $ids->toArray(),
            'total_count' => $ids->count()
        ]);

        return LearnRecordResource::make($record);
    }
}
