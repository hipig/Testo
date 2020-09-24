<?php

namespace App\Http\Controllers\Api;

use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function tree(Request $request)
    {
        $subjects = Subject::query()->where('level', '<=', 1)->get();

        return (new SubjectService())->getSubjectTree(null, $subjects);
    }

    public function show(Request $request, Subject $subject)
    {
        $subjects = $subject->childrens->groupBy('is_special');

        return $subjects;
    }
}
