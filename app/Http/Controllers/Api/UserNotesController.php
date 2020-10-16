<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\UserNoteRequest;
use App\Http\Resources\BankItemResource;
use App\Http\Resources\UserNoteResource;
use App\Models\BankItem;
use App\Models\UserNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserNotesController extends Controller
{
    public function index(Request $request)
    {
        $userNotes = optional($request->user('api'))
            ->notes()
            ->with('subject:id,title', 'question:id,title', 'bankItem', 'bankItem.collects')
            ->inSubject($request->subject_pid)
            ->onlySubject($request->subject_id)
            ->onlyQuestionType($request->question_type)
            ->betweenDate($request->date)
            ->orderBy('created_at', 'desc')
            ->orderBy('question_type')
            ->paginate($request->page_size ?? config('api.page_size'));

        return  UserNoteResource::collection($userNotes);
    }

    public function indexDetail(Request $request)
    {
        $bankItemIds = optional($request->user('api'))
            ->notes()
            ->inSubject($request->subject_pid)
            ->onlySubject($request->subject_id)
            ->onlyQuestionType($request->question_type)
            ->betweenDate($request->date)
            ->pluck('bank_item_id')
            ->toArray();

        $bankItems = BankItem::query()->with('bank', 'question', 'notes')->whereIn('id', $bankItemIds)->paginate($request->page_size ?? config('api.page_size'));

        return BankItemResource::collection($bankItems);
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
