<?php

namespace App\Http\Requests\Api;

class LearnRecordItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bank_item_id' => 'required',
            'question_id' => 'required',
            'answer' => 'required',
            'is_right' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'bank_item_id' => '题库',
            'question_id' => '题目',
            'answer' => '答案',
            'is_right' => '答题是否正确'
        ];
    }
}
