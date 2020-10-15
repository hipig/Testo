<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserReportRequest;
use App\Http\Resources\UserReportResource;
use App\Models\UserReport;
use Illuminate\Http\Request;

class UserReportsController extends Controller
{
    public function store(UserReportRequest $request)
    {
        $userReport = optional($request->user('api'))->reports()->create(
            $request->only('subject_id', 'bank_item_id', 'question_id', 'question_type', 'type', 'content', 'upload_ids')
        );

        return UserReportResource::make($userReport);
    }
}
