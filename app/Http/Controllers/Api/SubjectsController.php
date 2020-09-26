<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SubjectResource;
use App\Http\Resources\SubjectShowResource;
use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function tree(Request $request, SubjectService $service)
    {
        $subjects = Subject::query()->where('level', '<=', 1)->get();

        return  SubjectResource::collection($service->getSubjectTree(null, $subjects));
    }

    public function show(Request $request, Subject $subject)
    {
        return SubjectShowResource::make($subject);
    }
}
