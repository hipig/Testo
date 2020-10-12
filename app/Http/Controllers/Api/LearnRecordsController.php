<?php

namespace App\Http\Controllers\Api;

use App\Events\LearnRecordItemStored;
use App\Events\LearnRecordSubmitted;
use App\Exceptions\InvalidRequestException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LearnRecordExamStoreRequest;
use App\Http\Requests\Api\LearnRecordTestStoreRequest;
use App\Http\Requests\Api\LearnRecordUpdateRequest;
use App\Http\Resources\LearnRecordShowResource;
use App\Http\Resources\LearnRecordResource;
use App\Http\Resources\LearnRecordTestShowResource;
use App\Models\Bank;
use App\Models\BankItem;
use App\Models\LearnRecord;
use App\Models\LearnRecordItem;
use App\Models\Question;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LearnRecordsController extends Controller
{
    public function index(Request $request)
    {
        $query = optional($request->user('api'))->records()->with('bank', 'bank.subject');

        if ($subjectPid = $request->subject_pid) {
            $subjectIds = Subject::query()->where('parent_id', $subjectPid)->pluck('id');
            $bankIds = Bank::query()->whereIn('subject_id', $subjectIds)->pluck('id');
            $query->whereIn('bank_id', $bankIds);
        }

        if ($subjectId = $request->subject_id) {
            $query->where('bank_id', $subjectId);
        }

        if ($date = $request->date) {
            $dates = explode('-', $date);
            $query->whereBetween('created_at', $dates);
        }

        $records = $query->orderBy('updated_at', 'desc')->paginate();

        return LearnRecordResource::collection($records);
    }

    public function show(Request $request, LearnRecord $record)
    {
        if ($record->is_end) {
            throw new InvalidRequestException('考试已结束！');
        }

        $record->load('bank.groups.items');

        return LearnRecordShowResource::make($record);
    }

    public function showResult(Request $request, LearnRecord $record)
    {
        if (!$record->is_end) {
            throw new InvalidRequestException('请先交卷再来查看解析！');
        }

        $record->load('items');
        $record->withResult = true;

        return LearnRecordShowResource::make($record);
    }

    public function storeTest(LearnRecordTestStoreRequest $request)
    {
        $type = $request->type;
        $mode = $request->mode ?? 1;
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
            'user_id' => optional($request->user('api'))->id,
            'bank_id' => $bank->id,
            'quiz_mode' => $mode,
            'type' => $bank->type,
            'question_ids' => $ids->toArray(),
            'total_count' => $ids->count()
        ]);

        return LearnRecordResource::make($record);
    }

    public function storeExam(LearnRecordExamStoreRequest $request)
    {
        $bank = Bank::query()->findOrFail($request->bank_id);
        $bankItems = $bank->has_children ? $bank->childrenItems() : $bank->items();

        $record = LearnRecord::create([
            'user_id' => optional($request->user('api'))->id,
            'bank_id' => $bank->id,
            'quiz_mode' => LearnRecord::QUIZ_EXAM,
            'type' => $bank->type,
            'total_count' => $bankItems->count()
        ]);

        return LearnRecordResource::make($record);
    }

    public function update(LearnRecordUpdateRequest $request, LearnRecord $record)
    {
        if ($record->is_end) {
            throw new InvalidRequestException('禁止重复交卷！');
        }

        $record = DB::transaction(function () use ($record, $request) {
            $record->done_time = $request->done_time;
            $record->is_end = $request->type && $request->type == 'end';
            $record->save();

            $items = $request->items;
            foreach ($items as $data) {
                $selectData = collect($data)->only('bank_item_id', 'question_id')->toArray();

                $recordItem = $record->items()->updateOrCreate(
                    $selectData,
                    $data
                );

                event(new LearnRecordItemStored($recordItem));
            }

            return $record;
        });

        event(new LearnRecordSubmitted($record));

        return LearnRecordResource::make($record);
    }
}
