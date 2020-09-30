<?php

namespace App\Http\Requests\Api;

class LearnRecordUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'done_time' => 'required',
            'items' => ['required', 'array'],
            'items.*.bank_item_id' => 'required',
            'items.*.question_id' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'done_time' => '作答时间',
            'items.*.bank_item_id' => '关联题库',
            'items.*.question_id' => '关联问题'
        ];
    }
}
