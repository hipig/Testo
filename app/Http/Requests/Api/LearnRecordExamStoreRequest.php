<?php

namespace App\Http\Requests\Api;

class LearnRecordExamStoreRequest extends FormRequest
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
        ];
    }

    public function attributes()
    {
        return [
            'bank_id' => '题库'
        ];
    }
}
