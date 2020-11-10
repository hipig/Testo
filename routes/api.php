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

    // 资讯
    Route::get('articles', 'ArticlesController@index')->name('articles.index');
    Route::get('hot-articles', 'ArticlesController@hotList')->name('articles.index.hot');
    Route::get('articles/{article}', 'ArticlesController@show')->name('articles.show');
    // 关于我们
    Route::get('abouts', 'AboutsController@index')->name('abouts.index');
    Route::get('abouts/{about:name}', 'AboutsController@show')->name('abouts.show');

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

    // 登录后可以访问的接口
    Route::middleware('refresh.token')->group(function() {
        // 刷新token
        Route::put('authorizations/current', 'AuthorizationsController@update')->name('authorizations.update');
        // 删除token
        Route::delete('authorizations/current', 'AuthorizationsController@destroy')->name('authorizations.destroy');
        // 当前登录用户信息
        Route::get('user', 'UsersController@me')->name('user.show');
        // 修改头像
        Route::post('user/update-avatar', 'UsersController@updateAvatar')->name('user.update.avatar');
        // 修改昵称
        Route::post('user/update-name', 'UsersController@updateName')->name('user.update.name');
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
        // 生成每日一练答题记录
        Route::post('records/daily-test', 'LearnRecordsController@storeDailyTest')->name('learnRecords.store.daily.test');
        // 更新考试答题记录（交卷）
        Route::put('records/{record}', 'LearnRecordsController@update')->name('learnRecords.update');
        // 生成练习答题记录
        Route::post('records/{record}/items', 'LearnRecordItemsController@store')->name('learnRecordItems.store');
        // 删除答题记录
        Route::delete('records/{record}', 'LearnRecordsController@destroy')->name('learnRecords.destroy');

        // 题目收藏
        Route::get('user/collects', 'UserCollectsController@index')->name('userCollects.index');
        Route::post('user/collects', 'UserCollectsController@store')->name('userCollects.store');
        Route::get('user/collects/item', 'UserCollectsController@show')->name('userCollects.show');
        Route::delete('user/collects/item', 'UserCollectsController@delete')->name('userCollects.delete');
        Route::delete('user/collects/{userCollect}', 'UserCollectsController@destroy')->name('userCollects.destroy');
        // 题目纠错
        Route::post('user/reports', 'UserReportsController@store')->name('userReports.store');
        // 题目笔记
        Route::get('user/notes', 'UserNotesController@index')->name('userNotes.index');
        Route::get('user/notes/detail', 'UserNotesController@indexDetail')->name('userNotes.index.detail');
        Route::post('user/notes', 'UserNotesController@store')->name('userNotes.store');
        Route::delete('user/notes/{userNote}', 'UserNotesController@destroy')->name('userNotes.destroy');
        // 错题
        Route::get('user/errors', 'UserErrorsController@index')->name('userErrors.index');
        Route::delete('user/errors/{userError}', 'UserErrorsController@destroy')->name('userErrors.destroy');

        // 文件上传
        Route::post('uploads', 'UploadsController@store')->name('uploads.store');
    });
});

Route::prefix('v1/admin')->name('api.v1.admin.')->namespace('Admin')->group(function () {
    Route::post('login', 'AuthController@login')->name('login');

    Route::middleware('auth:admin')->group(function () {

        Route::get('me', 'AuthController@me')->name('me');
        Route::delete('logout', 'AuthController@logout')->name('logout');


        Route::get('subjects/tree', 'SubjectsController@tree')->name('subjects.tree');
        Route::apiResource('subjects', 'SubjectsController');
    });
});
