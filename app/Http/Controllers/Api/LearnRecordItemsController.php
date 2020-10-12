<?php

namespace App\Http\Controllers\Api;

use App\Events\LearnRecordItemStored;
use App\Events\LearnRecordSubmitted;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LearnRecordItemBatchRequest;
use App\Http\Requests\Api\LearnRecordItemRequest;
use App\Http\Resources\LearnRecordItemResource;
use App\Models\LearnRecord;
use App\Models\LearnRecordItem;
use App\Models\Question;
use Illuminate\Http\Request;

class LearnRecordItemsController extends Controller
{
    public function store(LearnRecordItemRequest $request, LearnRecord $record)
    {
        $recordItem = $record->items()->updateOrCreate(
            $request->only('bank_item_id', 'question_id'),
            $request->all()
        );

        event(new LearnRecordSubmitted($record));
        event(new LearnRecordItemStored($recordItem));

        return LearnRecordItemResource::make($recordItem);
    }
}
