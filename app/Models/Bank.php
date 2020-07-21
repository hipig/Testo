<?php

namespace App\Models;

class Bank extends Model
{
    const CHAPTER_STUDY = 1;
    const MOCK_EXAM = 2;
    const OLD_EXAM = 3;
    const DAILY_STUDY = 4;

    public static $typeMap = [
        self::CHAPTER_STUDY => '章节练习',
        self::MOCK_EXAM => '模拟考试',
        self::OLD_EXAM => '历年真题',
        self::DAILY_STUDY => '每日一练'
    ];

    protected $fillable = [
        'title', 'subject_id', 'parent_id', 'type',
        'is_free', 'price', 'time_limit', 'total_score',
        'total_count', 'source', 'remark', 'status', 'index'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'status' => 'boolean'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function parent()
    {
        return $this->belongsTo(Bank::class);
    }

    public function children()
    {
        return $this->hasMany(Bank::class, 'parent_id');
    }

    public function items()
    {
        return $this->hasMany(BankItem::class);
    }
}
