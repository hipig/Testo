<?php

namespace App\Http\Requests\Admin;

class AdminUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required',
            'password' => [
                'required',
                'alpha_dash',
                'min:6',
                function($attribute, $value, $fail) {
                    $credentials = $this->only('username', 'password');
                    if (!$token = \Auth::guard('admin')->attempt($credentials)) {
                        return $fail('用户名或密码错误');
                    }

                    $this->offsetSet('access_token', $token);
                }
            ]
        ];
    }
}
