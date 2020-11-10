<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Api\SubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::query()
            ->latest()
            ->paginate($request->page_size ?? config('api.page_size'));

        return SubjectResource::collection($subjects);
    }

    public function tree(Request $request, SubjectService $service)
    {
        $subjects = Subject::query()->where('level', '<', $request->level ?? 2)->get();

        return  SubjectResource::collection($service->getSubjectTree(null, $subjects));
    }

    public function show(Request $request, Subject $subject)
    {
        return new SubjectResource($subject);
    }

    public function store(SubjectRequest $request)
    {
        $subject = Subject::create($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'status', 'index'
        ]));

        return new SubjectResource($subject);
    }

    public function update(SubjectRequest $request, Subject $subject)
    {
        $subject->fill($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'status', 'index'
        ]));
        $subject->save();

        return new SubjectResource($subject);
    }

    public function destroy(Request $request, Subject $subject)
    {
        $subject->delete();

        return response(null, 204);
    }
}
