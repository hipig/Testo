<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutResource;
use App\Models\About;
use Illuminate\Http\Request;

class AboutsController extends Controller
{
    public function index(Request $request)
    {
        $abouts = About::query()
            ->status()
            ->orderIndex()
            ->get();

        return AboutResource::collection($abouts);
    }

    public function show(Request $request, About $about)
    {
        return AboutResource::make($about);
    }
}
