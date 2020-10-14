<?php

namespace App\Http\Requests\Api;

class UserCollectRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'subject_id' => 'required',
            'bank_item_id' => 'required',
            'question_id' => 'required',
            'question_type' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'subject_id' => '科目',
            'bank_item_id' => '题库题目',
            'question_id' => '题目',
            'question_type' => '题目类型'
        ];
    }
}
