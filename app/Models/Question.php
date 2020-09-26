<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    const SINGLE_SELECT = 1;
    const MULTI_SELECT = 2;
    const JUDGE_SELECT = 3;
    const FILL_BLANK = 4;
    const SHORT_ANSWER = 5;

    public static $typeMap = [
        self::SINGLE_SELECT => '单选题',
        self::MULTI_SELECT => '多选题',
        self::JUDGE_SELECT => '判断题',
        self::FILL_BLANK => '填空题',
        self::SHORT_ANSWER => '问答题'
    ];

    protected $fillable = [
        'title', 'type', 'option', 'answer',
        'material', 'parse', 'status', 'index'
    ];

    protected $casts = [
        'option' => 'array'
    ];
}
