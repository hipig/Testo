<?php

namespace App\Models;

class Bank extends Model
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
        'title', 'subject_id', 'parent_id', 'type',
        'is_free', 'price', 'time_limit', 'total_score',
        'total_count', 'source', 'remark', 'status', 'index'
    ];

    protected $casts = [
        'is_free' => 'boolean',
        'status' => 'boolean'
    ];

    protected $with = [
        'children'
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function parent()
    {
        return $this->belongsTo(Bank::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Bank::class, 'parent_id');
    }

    public function groups()
    {
        return $this->hasMany(BankGroup::class, 'bank_id')->orderBy('item_type');
    }

    public function items()
    {
        return $this->hasMany(BankItem::class, 'bank_id')->orderBy('index')->orderBy('type');
    }

    public function childrenItems()
    {
        return $this->hasManyThrough(BankItem::class, Bank::class, 'parent_id', 'bank_id');
    }

    public function records()
    {
        return $this->hasMany(LearnRecord::class, 'bank_id');
    }

    public function recordItems()
    {
        return $this->hasManyThrough(LearnRecordItem::class, LearnRecord::class, 'bank_id', 'record_id');
    }

    public function getHasChildrenAttribute()
    {
        return $this->children->isNotEmpty();
    }

    public function getIsGroupAttribute()
    {
        return $this->groups->isNotEmpty();
    }
}
