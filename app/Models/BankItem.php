<?php

namespace App\Models;

class BankItem extends Model
{
    protected $fillable = [
        'bank_id', 'group_id', 'question_id',
        'type', 'score', 'status', 'index'
    ];

    protected $casts = [
        'status' => 'boolean'
    ];

    protected $with = [
        'question'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'bank_id');
    }

    public function group()
    {
        return $this->belongsTo(BankGroup::class, 'group_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
