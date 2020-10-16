<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserErrorResource;
use App\Models\UserError;
use Illuminate\Http\Request;

class UserErrorsController extends Controller
{
    public function index(Request $request)
    {
        $userErrors = optional($request->user('api'))
            ->errors()
            ->with('subject:id,title', 'question:id,title', 'bankItem', 'bankItem.collects')
            ->inSubject($request->subject_pid)
            ->onlySubject($request->subject_id)
            ->onlyQuestionType($request->question_type)
            ->betweenDate($request->date)
            ->orderBy('created_at', 'desc')
            ->orderBy('question_type')
            ->paginate($request->page_size ?? config('api.page_size'));

        return UserErrorResource::collection($userErrors);
    }

    public function destroy(Request $request, UserError $userError)
    {
        $this->authorize('own', $userError);

        $userError->delete();

        return response(null, 204);
    }
}
