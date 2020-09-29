<?php

namespace App\Http\Requests\Api;

class LearnRecordItemBatchRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'record_id' => 'required',
            'done_time' => 'required',
            'items.*.record_id' => 'required',
            'items.*.bank_item_id' => 'required',
            'items.*.question_id' => 'required',
            'items.*.answer' => 'required',
            'items.*.is_right' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'record_id' => '学习记录',
            'done_time' => '作答时间',
            'items.*.record_id' => '学习记录',
            'items.*.bank_item_id' => '题库',
            'items.*.question_id' => '题目',
            'items.*.answer' => '答案',
            'items.*.is_right' => '答题是否正确'
        ];
    }
}
