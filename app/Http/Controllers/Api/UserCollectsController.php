<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\UserCollectRequest;
use App\Http\Resources\UserCollectResource;
use App\Models\UserCollect;
use Illuminate\Http\Request;

class UserCollectsController extends Controller
{
    public function index(Request $request)
    {
        $userCollects = optional($request->user('api'))
            ->collects()
            ->with('subject:id,title', 'question:id,title')
            ->inSubject($request->subject_pid)
            ->onlySubject($request->subject_id)
            ->onlyQuestionType($request->question_type)
            ->betweenDate($request->date)
            ->orderBy('created_at', 'desc')
            ->paginate($request->page_size ?? config('api.page_size'));

        return UserCollectResource::collection($userCollects);
    }

    public function store(UserCollectRequest $request)
    {
        $userCollect = optional($request->user('api'))
            ->collects()
            ->create(
                $request->only('subject_id', 'bank_item_id', 'question_id', 'question_type')
            );

        return UserCollectResource::make($userCollect);
    }

    public function show(UserCollectRequest $request)
    {
        $userCollect = optional($request->user('api'))
            ->collects()
            ->onlyBankItem($request->bank_item_id)
            ->first();

        return UserCollectResource::make($userCollect);
    }

    public function destroy(Request $request, UserCollect $userCollect)
    {
        $this->authorize('own', $userCollect);

        $userCollect->delete();

        return response(null, 204);
    }

    public function delete(UserCollectRequest $request)
    {
        $userCollect = optional($request->user('api'))
            ->collects()
            ->onlyBankItem($request->bank_item_id)
            ->first();

        $this->authorize('own', $userCollect);

        $userCollect->delete();

        return response(null, 204);
    }
}
