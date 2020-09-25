<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class AuthorizationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'phone' => [
                'required',
                'regex:/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/'
            ],
            'password' => [
                'required',
                'alpha_dash',
                'min:6',
                function($attribute, $value, $fail) {
                    $credentials = $this->only('phone', 'password');
                    if (!$token = \Auth::guard('api')->attempt($credentials)) {
                        return $fail('用户名或密码错误');
                    }

                    $this->offsetSet('access_token', $token);
                }
            ],
        ];
    }

    public function attributes()
    {
        return [
            'phone' => '手机号码'
        ];
    }
}
