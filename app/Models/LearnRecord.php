<?php

namespace App\Models;

use App\Models\Traits\DateScopeTrait;

class LearnRecord extends Model
{
    use DateScopeTrait;

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

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($model) {
            $model->items()->delete();
        });
    }

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

    public function getBankItemsAttribute()
    {
        switch ($this->type) {
            case self::CHAPTER_TEST:
                $items = BankItem::query()
                    ->whereIn('id', $this->question_ids)
                    ->orderBy('index')
                    ->orderBy('question_type')
                    ->get();
                break;
            case self::MOCK_EXAM:
            case self::OLD_EXAM:
                $items = $this->bank->is_group ? $this->bank->groups : $this->bank->items;
                break;
            case self::DAILY_TEST:
                $items = $this->bank->items;
                break;
        }
        return $items;
    }

    public function scopeInSubject($query, $subjectPid)
    {
        if ($subjectPid) {
            $subjectIds = Subject::query()->where('parent_id', $subjectPid)->pluck('id');
            $bankIds = Bank::query()->whereIn('subject_id', $subjectIds)->pluck('id');
            $query->whereIn('bank_id', $bankIds);
        }
        return $query;
    }

    public function scopeInBank($query, $subjectId)
    {
        if ($subjectId) {
            $bankIds = Bank::query()->where('subject_id', $subjectId)->pluck('id');
            $query->whereIn('bank_id', $bankIds);
        }
        return $query;
    }

    public function scopeInType($query, $type)
    {
        $type && $query->whereIn('type', $type);
        return $query;
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
