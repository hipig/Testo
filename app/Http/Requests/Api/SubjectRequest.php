<?php

namespace App\Http\Requests\Api;


class SubjectRequest extends FormRequest
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
            'name' => 'required|alpha',
            'is_special' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'title' => '名称',
            'name' => '标识',
            'is_special' => '是否专业科目'
        ];
    }
}
