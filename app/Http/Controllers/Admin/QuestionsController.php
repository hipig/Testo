<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\QuestionRequest;
use App\Http\Resources\Admin\QuestionResource;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function index(Request $request)
    {
        $questions = Question::query()
            ->latest()
            ->paginate($request->page_size ?? config('api.page_size'));

        return QuestionResource::collection($questions);
    }

    public function store(QuestionRequest $request)
    {
        $question = Question::create($request->only([
            'title', 'type', 'option', 'answer',
            'material', 'parse', 'status', 'index'
        ]));

        return QuestionResource::make($question);
    }

    public function show(Request $request, Question $question)
    {
        return QuestionResource::make($question);
    }

    public function update(Request $request, Question $question)
    {
        $question->fill($request->only([
            'title', 'type', 'option', 'answer',
            'material', 'parse', 'status', 'index'
        ]));
        $question->save();

        return QuestionResource::make($question);
    }

    public function destroy(Request $request, Question $question)
    {
        $question->delete();

        return response(null, 204);
    }
}
