<?php

namespace App\Models;

class LearnRecord extends Model
{
    const CHAPTER_TEST = 1;
    const MOCK_EXAM = 2;
    const OLD_EXAM = 3;
    const DAILY_TEST = 4;

    public static $typeMap = [
        self::CHAPTER_TEST => '章节练习',
        self::MOCK_EXAM => '模拟考试',
        self::OLD_EXAM => '历年真题',
        self::DAILY_TEST => '每日一练'
    ];

    protected $fillable = [
        'user_id', 'bank_id', 'question_ids', 'type',
        'total_count', 'done_count', 'done_time'
    ];

    protected $casts = [
        'question_ids' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function items()
    {
        return $this->hasMany(LearnRecordItem::class, 'record_id');
    }

    public function getTestQuestionItemsAttribute()
    {
        return BankItem::query()
            ->whereIn('id', $this->question_ids)
            ->orderBy('index')
            ->orderBy('type')
            ->get();
    }
}
