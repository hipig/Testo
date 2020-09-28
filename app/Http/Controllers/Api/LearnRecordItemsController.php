<?php

namespace App\Http\Controllers\Api;

use App\Events\LearnRecordStored;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LearnRecordItemRequest;
use App\Http\Resources\LearnRecordItemResource;
use App\Models\LearnRecordItem;
use App\Models\Question;
use Illuminate\Http\Request;

class LearnRecordItemsController extends Controller
{
    public function store(LearnRecordItemRequest $request)
    {
        $recordItem = LearnRecordItem::updateOrCreate(
            $request->only('record_id', 'bank_item_id', 'question_id'),
            $request->all()
        );

        event(new LearnRecordStored($recordItem));

        return LearnRecordItemResource::make($recordItem);
    }

    public function batchStore()
    {

    }
}
