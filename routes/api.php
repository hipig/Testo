<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->name('api.v1.')->group(function() {

    Route::get('subjects/tree', 'SubjectsController@tree')->name('subjects.tree');
    Route::get('subjects/{subject}', 'SubjectsController@show')->name('subjects.show');

    Route::prefix('admin')->namespace('Admin')->group(function () {

        Route::apiResources([
            'subjects' => 'SubjectsController',
        ]);

    });
});
