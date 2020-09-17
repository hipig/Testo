<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RouterController extends Controller
{
    public function __invoke()
    {
        return view('router');
    }
}
