<?php

namespace App\Http\Requests\Admin;

use App\Models\Bank;
use Illuminate\Validation\Rule;

class BankRequest extends FormRequest
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
            'subject_id' => 'required',
            'type' => 'required',
            'is_free' => 'required',
            'price' => [
                Rule::requiredIf(!$this->is_free)
            ],
            'is_group' => [
                Rule::requiredIf(in_array($this->type, Bank::$needTimeLimitTypeMap))
            ],
            'time_limit' => [
                Rule::requiredIf(in_array($this->type, Bank::$needTimeLimitTypeMap))
            ],
        ];
    }

    public function attributes()
    {
        return [
            'title' => '名称',
            'subject_id' => '所属科目',
            'type' => '类型',
            'is_free' => '是否免费',
            'price' => '价格',
            'is_group' => '是否分组',
            'time_limit' => '时间限制'
        ];
    }
}
