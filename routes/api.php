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

    // 获取科目树形
    Route::get('subjects/tree', 'SubjectsController@tree')->name('subjects.tree');
    Route::get('subjects/{subject}', 'SubjectsController@show')->name('subjects.show');

    // 获取题库列表
    Route::get('subjects/{subject}/chapter-tests', 'BanksController@chapterTests')->name('subjects.chapterTests');
    Route::get('subjects/{subject}/mock-exams', 'BanksController@mockExams')->name('subjects.mockExams');
    Route::get('subjects/{subject}/old-exams', 'BanksController@oldExams')->name('subjects.oldExams');
    Route::get('subjects/{subject}/daily-tests', 'BanksController@dailyTests')->name('subjects.dailyTests');
    // 获取题型总计
    Route::get('banks/{bank}/count-type-total', 'BanksController@getTypeCount')->name('banks.countTypeTotal');
    // 获取练习记录详情
    Route::get('records/test/{record}', 'LearnRecordsController@testShow')->name('learnRecords.show.test');

    Route::middleware('throttle:' . config('api.rate_limits.sign'))
        ->group(function () {

            // 图片验证码
            Route::post('captchas', 'CaptchasController@store')->name('captchas.store');
            // 短信验证码
            Route::post('verificationCodes', 'VerificationCodesController@store')->name('verificationCodes.store');
            // 用户注册
            Route::post('users', 'UsersController@store')->name('users.store');
        });
    // 用户登录
    Route::post('authorizations', 'AuthorizationsController@store')->name('authorizations.store');
    // 刷新token
    Route::put('authorizations/current', 'AuthorizationsController@update')->name('authorizations.update');
    // 删除token
    Route::delete('authorizations/current', 'AuthorizationsController@destroy')->name('authorizations.destroy');

    // 登录后可以访问的接口
    Route::middleware('refresh.token')->group(function() {
        // 当前登录用户信息
        Route::get('user', 'UsersController@me')->name('user.show');
        // 生成练习记录
        Route::post('records/test', 'LearnRecordsController@testStore')->name('learnRecords.store.test');
        // 生成答题记录
        Route::post('record-items', 'LearnRecordItemsController@store')->name('learnRecordItems.store');
    });


    Route::prefix('admin')->namespace('Admin')->group(function () {

        Route::apiResources([
            'subjects' => 'SubjectsController',
        ]);

    });
});
