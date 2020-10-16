<?php

namespace App\Models;

class BankGroup extends Model
{
    protected $fillable = [
        'title', 'bank_id', 'item_type', 'item_score',
        'item_count', 'status', 'index'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function items()
    {
        return $this->hasMany(BankItem::class, 'group_id')->orderBy('index')->orderBy('question_type');
    }

    public function recordItems()
    {
        return $this->hasMany(LearnRecordItem::class, 'bank_id');
    }
}
