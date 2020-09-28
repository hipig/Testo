<?php

namespace App\Models;

class LearnRecordItem extends Model
{
    protected $fillable = [
        'record_id', 'bank_item_id', 'question_id', 'answer',
        'is_right', 'score'
    ];

    protected $casts = [
        'is_right' => 'boolean'
    ];

    public function record()
    {
        return $this->belongsTo(LearnRecord::class, 'record_id');
    }

    public function bankItem()
    {
        return $this->belongsTo(bankItem::class, 'bank_item_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
