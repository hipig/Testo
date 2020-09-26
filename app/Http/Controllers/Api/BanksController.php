<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BankResource;
use App\Models\Subject;
use Illuminate\Http\Request;

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
}
