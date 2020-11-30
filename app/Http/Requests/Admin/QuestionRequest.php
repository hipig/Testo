<?php

namespace App\Http\Requests\Admin;

use App\Models\Question;
use Illuminate\Validation\Rule;

class QuestionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'type' => 'required',
            'answer' => Rule::requiredIf(in_array($this->type, Question::$checkRightType))
        ];
    }

    public function attributes()
    {
        return [
            'title' => '标题',
            'type' => '类型',
            'answer' => '答案'
        ];
    }
}
