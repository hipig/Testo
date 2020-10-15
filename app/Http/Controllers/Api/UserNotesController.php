<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserNoteRequest;
use App\Http\Resources\UserNoteResource;
use App\Models\UserNote;
use Illuminate\Http\Request;

class UserNotesController extends Controller
{
    public function index(Request $request)
    {
        $userNotes = optional($request->user('api'))
            ->notes()
            ->with('subject:id,title', 'question:id,title')
            ->inSubject($request->subject_pid)
            ->onlySubject($request->subject_id)
            ->onlyQuestionType($request->question_type)
            ->betweenDate($request->date)
            ->orderBy('created_at', 'desc')
            ->paginate($request->page_size ?? config('api.page_size'));

        return  UserNoteResource::collection($userNotes);
    }

    public function store(UserNoteRequest $request)
    {
        $userNote = optional($request->user('api'))->notes()->create(
            $request->only('subject_id', 'bank_item_id', 'question_id', 'question_type', 'content', 'upload_ids')
        );

        return UserNoteResource::make($userNote);
    }

    public function destroy(Request $request, UserNote $userNote)
    {
        $this->authorize('own', $userNote);

        $userNote->delete();

        return response(null, 204);
    }
}
