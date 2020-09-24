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

Route::prefix('v1')->name('api.v1.')->namespace('Api')->group(function() {

    Route::get('subjects/tree', 'SubjectsController@tree')->name('subjects.tree');
    Route::get('subjects/{subject}', 'SubjectsController@show')->name('subjects.show');

    Route::middleware('throttle:' . config('api.rate_limits.sign'))
        ->group(function () {

            // 图片验证码
            Route::post('captchas', 'CaptchasController@store')->name('captchas.store');
            // 短信验证码
            Route::post('verificationCodes', 'VerificationCodesController@store')->name('verificationCodes.store');
            // 用户注册
            Route::post('users', 'UsersController@store')->name('users.store');
        });


    Route::prefix('admin')->namespace('Admin')->group(function () {

        Route::apiResources([
            'subjects' => 'SubjectsController',
        ]);

    });
});
