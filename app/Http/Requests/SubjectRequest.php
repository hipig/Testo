<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

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
            'title' => '标题',
            'name' => '标识',
            'is_special' => '是否专业科目'
        ];
    }
}
