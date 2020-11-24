<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\SubjectRequest;
use App\Http\Resources\Admin\SubjectResource;
use App\Http\Resources\Admin\SubjectShowResource;
use App\Models\Subject;
use App\Services\SubjectService;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(Request $request)
    {
        $query = Subject::query();

        $request->has('level') && $query->where('level', $request->level);

        $subjects = $query->latest()->paginate($request->page_size ?? config('api.page_size'));

        return SubjectResource::collection($subjects);
    }

    public function tree(Request $request, SubjectService $service)
    {
        $subjects = Subject::query()->where('level', '<', $request->level ?? 2)->get();

        return  SubjectResource::collection($service->getSubjectTree(null, $subjects));
    }

    public function store(SubjectRequest $request)
    {
        $subject = Subject::create($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'status', 'index'
        ]));

        return SubjectResource::make($subject);
    }

    public function show(Request $request, Subject $subject)
    {
        return SubjectShowResource::make($subject);
    }

    public function update(SubjectRequest $request, Subject $subject)
    {
        $subject->fill($request->only([
            'title', 'name', 'parent_id', 'thumb', 'is_special',
            'is_directory', 'status', 'index'
        ]));
        $subject->save();

        return SubjectResource::make($subject);
    }

    public function destroy(Request $request, Subject $subject)
    {
        $subject->delete();

        return response(null, 204);
    }
}
