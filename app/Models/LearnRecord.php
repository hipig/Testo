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

    const QUIZ_TEST = 1;
    const QUIZ_EXAM= 2;

    public static $quizModeMap = [
        self::QUIZ_TEST => '练习模式',
        self::QUIZ_EXAM => '考试模式'
    ];

    protected $fillable = [
        'user_id', 'bank_id', 'question_ids', 'type',
        'quiz_mode', 'total_count', 'done_count', 'done_time'
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

    public function getQuestionItemsAttribute()
    {
        return BankItem::query()
            ->whereIn('id', $this->question_ids)
            ->orderBy('index')
            ->orderBy('type')
            ->get();
    }

    public function getItemsResult($type = 1)
    {
        $query = $this->items()->where('question_type', $type);

        return [
            'type' => $type,
            'total' => (clone $query)->count(),
            'right' => (clone $query)->where('is_right', true)->count(),
            'error' => (clone $query)->where(function ($query) {
                $query->where('is_right', false)->orWhere('is_right', null);
            })->count(),
            'score' => (clone $query)->where('is_right', true)->sum('score'),
        ];
    }
}
