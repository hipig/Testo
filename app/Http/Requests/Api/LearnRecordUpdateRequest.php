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
            'items' => 'array'
        ];
    }

    public function attributes()
    {
        return [
            'done_time' => '作答时间',
            'items' => '作答列表'
        ];
    }
}
