<?php

namespace App\Http\Requests\Api;

class LearnRecordTestStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bank_id' => 'required',
            'range' => 'required|string',
            'type' => 'required|numeric',
            'number' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'bank_id' => '题库',
            'range' => '范围',
            'type' => '类型',
            'number' => '数量'
        ];
    }
}
