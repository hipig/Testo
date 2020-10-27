<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::query()->paginate();

        return SubjectResource::collection($subjects);
    }

    public function store(Request $request)
    {
        $subject = Subject::create($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'level', 'path', 'status', 'index'
        ]));

        return new SubjectResource($subject);
    }
}
