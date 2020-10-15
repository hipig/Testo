<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UploadsResource;
use App\Models\Upload;
use Illuminate\Http\Request;

class UploadsController extends Controller
{
    public function store(Request $request)
    {
        $path = $request->type === 'file' ? 'files' : 'images';

        $filePath = $request->file->store($path, config('api.storage_disk'));

        $upload = optional($request->user('api'))->uploads()->create([
            'name' => $request->file->getClientOriginalName(),
            'path' => $filePath
        ]);

        return UploadsResource::make($upload);
    }
}
