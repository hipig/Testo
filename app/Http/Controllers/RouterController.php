<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouterController extends Controller
{
    public function __invoke()
    {
        $config = [
            'app_name' => config('app.name'),
            'path' => '/',
            'api_url' => config('api.api_url')
        ];

        return view('router', compact('config'));
    }
}
