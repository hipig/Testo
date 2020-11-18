<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminRouterController extends Controller
{
    public function __invoke()
    {
        $config = [
            'app_name' => config('app.name'),
            'path' => '/admin',
            'api_url' => config('api.api_url'). '/admin'
        ];

        return view('admin', compact('config'));
    }
}
