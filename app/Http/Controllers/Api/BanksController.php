<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BankResource;
use App\Models\Bank;
use App\Models\BankItem;
use App\Models\Question;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BanksController extends Controller
{
    public function chapterTests(Request $request, Subject $subject)
    {
        $chapterTests = $subject->load('chapterTests.items', 'chapterTests.childrenItems')
            ->chapterTests()
            ->whereNull('parent_id')
            ->with('children')
            ->status()
            ->orderBy('index')
            ->orderBy('created_at', 'desc')
            ->get();

        return BankResource::collection($chapterTests);
    }

    public function mockExams(Request $request, Subject $subject)
    {
        $mockExams = $subject->load('mockExams.items')
            ->mockExams()
            ->status()
            ->orderBy('index')
            ->orderBy('created_at', 'desc')
            ->get();

        return BankResource::collection($mockExams);
    }

    public function oldExams(Request $request, Subject $subject)
    {
        $oldExams = $subject->load('oldExams.items')
            ->oldExams()
            ->status()
            ->orderBy('index')
            ->orderBy('created_at', 'desc')
            ->get();;

        return BankResource::collection($oldExams);
    }

    public function dailyTests(Request $request, Subject $subject)
    {
        $dailyTests = $subject->load('dailyTests.limit3Items')
            ->dailyTests()
            ->status()
            ->get();

        return BankResource::collection($dailyTests);
    }

    public function getTypeCount(Request $request, Bank $bank)
    {
        $user = optional($request->user('api'));
        $hasChildren = $bank->has_children;

        $bankIds = $hasChildren ? $bank->children()->pluck('id')->toArray() : [$bank->id];
        $bankItems = $hasChildren ? $bank->childrenItems() : $bank->items();
        $columnPrefix = $hasChildren ? 'bank_items.' : '';
        if (Auth::guard('api')->check()) {
            switch ($request->type) {
                case 'undone':
                    $doneIds = $user->recordItems()->whereIn('learn_record_items.bank_id', $bankIds)->pluck('bank_item_id')->toArray() ?? [];
                    $bankItems->whereNotIn($columnPrefix.'id', $doneIds);
                    break;
                case 'done':
                    $doneIds = $user->recordItems()->whereIn('learn_record_items.bank_id', $bankIds)->pluck('bank_item_id')->toArray() ?? [];
                    $bankItems->whereIn($columnPrefix.'id', $doneIds);
                    break;
                case 'error':
                    $errorIds = $user->errors()->whereIn('bank_id', $bankIds)->pluck('bank_item_id')->toArray() ?? [];
                    $bankItems->whereIn($columnPrefix.'id', $errorIds);
                    break;
            }
        }

        $list = [
            0 => (clone $bankItems)->count(),
            1 => (clone $bankItems)->where($columnPrefix.'question_type', Question::SINGLE_SELECT)->count(),
            2 => (clone $bankItems)->where($columnPrefix.'question_type', Question::MULTI_SELECT)->count(),
            3 => (clone $bankItems)->where($columnPrefix.'question_type', Question::JUDGE_SELECT)->count(),
            4 => (clone $bankItems)->where($columnPrefix.'question_type', Question::FILL_BLANK)->count(),
            5 => (clone $bankItems)->where($columnPrefix.'question_type', Question::SHORT_ANSWER)->count(),
        ];

        return response()->json($list);
    }
}
