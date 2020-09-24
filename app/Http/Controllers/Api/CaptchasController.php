<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CaptchaRequest;
use Illuminate\Http\Request;

class CaptchasController extends Controller
{
    public function store(CaptchaRequest $request)
    {
        $key = 'captcha-'.\Str::random(15);
        $phone = $request->phone;

        $captcha = \Captcha::create('mini', true);
        $expiredAt = Carbon::now()->addMinutes(2);
        \Cache::put($key, ['phone' => $phone, 'key' => $captcha['key']], $expiredAt);

        $result = [
            'captcha_key' => $key,
            'expired_at' => $expiredAt->toDateTimeString(),
            'captcha_image' => $captcha['img']
        ];

        return response()->json($result)->setStatusCode(201);
    }
}
