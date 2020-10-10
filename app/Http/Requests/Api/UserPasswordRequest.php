<?php

namespace App\Http\Requests\Api;

use Illuminate\Support\Facades\Hash;

class UserPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password_old' => [
                'required',
                'alpha_dash',
                'min:6',
                function($attribute, $value, $fail) {
                    if (!Hash::check($value, optional($this->user('api'))->password)) {
                        return $fail('旧密码不正确');
                    }
                }
            ],
            'password' => 'required|alpha_dash|min:6|confirmed'
        ];
    }

    public function attributes()
    {
        return [
            'password_old' => '旧密码',
            'password' => '新密码'
        ];
    }
}
