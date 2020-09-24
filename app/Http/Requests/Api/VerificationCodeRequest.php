<?php

namespace App\Http\Requests\Api;

class VerificationCodeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'captcha_key' => 'required|string',
            'captcha_code' => [
                'required',
                function($attribute, $value, $fail) {
                    $captchaData  = \Cache::get($this->captcha_key);

                    if (!$captchaData) {
                        return $fail('图片验证码已失效。');
                    }

                    if (!captcha_api_check($value, $captchaData['key'])) {
                        \Cache::forget($this->captcha_key);
                        return $fail('短信验证码错误。');
                    }

                    $this->offsetSet('phone', $captchaData['phone']);
                }
            ],
        ];
    }

    public function attributes()
    {
        return [
            'captcha_key' => '图片验证码 KEY',
            'captcha_code' => '图片验证码',
        ];
    }
}
