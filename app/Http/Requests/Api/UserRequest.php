<?php

namespace App\Http\Requests\Api;

class UserRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'verification_key' => 'required|string',
            'verification_code' => [
                'required',
                'string',
                function($attribute, $value, $fail) {
                    $verifyData = \Cache::get($this->verification_key);

                    if (!$verifyData) {
                        return $fail('短信验证码已失效。');
                    }

                    if (!hash_equals($verifyData['code'], $value)) {
                        return $fail('短信验证码错误。');
                    }

                    $this->offsetSet('phone', $verifyData['phone']);
                }
            ],
            'password' => 'required|alpha_dash|min:6|confirmed',
        ];
    }

    public function attributes()
    {
        return [
            'verification_key' => '短信验证码 KEY',
            'verification_code' => '短信验证码',
        ];
    }

    public function messages()
    {
        return [
            'verification_key.required'  => '请先发送短信验证码。'
        ];
    }
}
