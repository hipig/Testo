<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BankResource;
use App\Models\Bank;
use App\Models\Question;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BanksController extends Controller
{
    public function chapterTests(Request $request, Subject $subject)
    {
        $chapterTests = $subject->chapterTests()
            ->whereNull('parent_id')
            ->with('children')
            ->get();

        return BankResource::collection($chapterTests);
    }

    public function mockExams(Request $request, Subject $subject)
    {
        $mockExams = $subject->mockExams;

        return BankResource::collection($mockExams);
    }

    public function oldExams(Request $request, Subject $subject)
    {
        $oldExams = $subject->oldExams;

        return BankResource::collection($oldExams);
    }

    public function dailyTests(Request $request, Subject $subject)
    {
        $dailyTests = $subject->dailyTests()->with(['items' => function($query) {
            $query->limit(3);
        }])->get();

        return BankResource::collection($dailyTests);
    }

    public function getTypeCount(Request $request, Bank $bank)
    {
        $bankItems = $bank->has_children ? $bank->childrenItems() : $bank->items();
        $columnPrefix = $bank->has_children ? 'bank_items.' : '';
        switch ($request->type) {
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
                break;
            default:
                $query = $bankItems;
        }

        $list = [
            0 => (clone $query)->count(),
            1 => (clone $query)->where($columnPrefix.'type', Question::SINGLE_SELECT)->count(),
            2 => (clone $query)->where($columnPrefix.'type', Question::MULTI_SELECT)->count(),
            3 => (clone $query)->where($columnPrefix.'type', Question::JUDGE_SELECT)->count(),
            4 => (clone $query)->where($columnPrefix.'type', Question::FILL_BLANK)->count(),
            5 => (clone $query)->where($columnPrefix.'type', Question::SHORT_ANSWER)->count(),
        ];

        return response()->json($list);
    }
}
