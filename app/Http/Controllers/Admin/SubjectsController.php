<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Api\SubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::query()->paginate($request->page_size ?? config('api.page_size'));

        return SubjectResource::collection($subjects);
    }

    public function store(SubjectRequest $request)
    {
        $subject = Subject::create($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'level', 'path', 'status', 'index'
        ]));

        return new SubjectResource($subject);
    }

    public function destroy(Request $request, Subject $subject)
    {
        $subject->delete();

        return response(null, 204);
    }
}
