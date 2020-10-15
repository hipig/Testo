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

    // 科目树形
    Route::get('subjects/tree', 'SubjectsController@tree')->name('subjects.tree');
    Route::get('subjects/{subject}', 'SubjectsController@show')->name('subjects.show');

    // 题库列表
    Route::get('subjects/{subject}/chapter-tests', 'BanksController@chapterTests')->name('subjects.chapterTests');
    Route::get('subjects/{subject}/mock-exams', 'BanksController@mockExams')->name('subjects.mockExams');
    Route::get('subjects/{subject}/old-exams', 'BanksController@oldExams')->name('subjects.oldExams');
    Route::get('subjects/{subject}/daily-tests', 'BanksController@dailyTests')->name('subjects.dailyTests');
    // 获取题型总计
    Route::get('banks/{bank}/count-type-total', 'BanksController@getTypeCount')->name('banks.countTypeTotal');

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
        // 修改密码
        Route::post('user/change-password', 'UsersController@updatePassword')->name('user.change.password');

        // 答题记录
        Route::get('records', 'LearnRecordsController@index')->name('learnRecords.index');
        // 获取答题记录详情
        Route::get('records/{record}', 'LearnRecordsController@show')->name('learnRecords.show');
        // 获取答题记录结果
        Route::get('records/{record}/result', 'LearnRecordsController@showResult')->name('learnRecords.show.result');
        // 生成练习答题记录
        Route::post('records/test', 'LearnRecordsController@storeTest')->name('learnRecords.store.test');
        // 生成考试答题记录
        Route::post('records/exam', 'LearnRecordsController@storeExam')->name('learnRecords.store.exam');
        // 更新考试答题记录（交卷）
        Route::put('records/{record}', 'LearnRecordsController@update')->name('learnRecords.update');
        // 生成练习答题记录
        Route::post('records/{record}/items', 'LearnRecordItemsController@store')->name('learnRecordItems.store');

        // 题目收藏
        Route::get('user/collects', 'UserCollectsController@index')->name('userCollects.index');
        Route::post('user/collects', 'UserCollectsController@store')->name('userCollects.store');
        Route::get('user/collects/item', 'UserCollectsController@show')->name('userCollects.show');
        Route::delete('user/collects/{userCollect}', 'UserCollectsController@destroy')->name('userCollects.destroy');
        Route::delete('user/collects/item', 'UserCollectsController@delete')->name('userCollects.delete');

        Route::post('uploads', 'UploadsController@store')->name('uploads.store');
    });


    Route::prefix('admin')->namespace('Admin')->group(function () {

        Route::apiResources([
            'subjects' => 'SubjectsController',
        ]);

    });
});
